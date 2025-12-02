import Swal from 'sweetalert2';
import { useEffect,useState } from "react";
import { getInfo,idDuplCheck,updateUser,IdDrop,getLogout,usePostCode} from '../feature/auth/authAPI';
import { useNavigate,Link } from 'react-router-dom';
import '../styles/myPage.css'; // ✨ 새로운 CSS 파일 import
import { useDispatch} from 'react-redux';
import { MyPage_SideBar } from '../components/auth/MyPage/MyPage_SideBar';
import { SignUp_InputBox } from '../components/auth/SignUp/InputBox/SignUp_InputBox';
import { MyPage_InputSection } from '../components/auth/MyPage/MyPage_InputSection';


export function MyPage2(){

    const handleDatainit = {uid:"",upass:"",
                            uname:"",uage:"",
                            ugender:"",uaddress_main:"",uaddress_sub:"",postcode:"",
                            uemail:"",uphone:""
    }
    const editDatainit = {uid:0,upass:0,
                            uname:0,uage:0,
                            ugender:0,uaddress_main:0,uaddress_sub:0,postcode:"",
                            uemail:0,uphone:0
    }    
    const dataChangeButtonOnOffInit = {uid:false,upass:false,
                                    uname:false,uage:false,
                                    ugender:false,uaddress:false,
                                    uemail:false,uphone:false
    }
    const nameString = {uid:"아이디",upass:"패스워드",
                        uname:"이름",uage:"나이",
                        ugender:"성별",uaddress:"주소",
                        uemail:"이메일",uphone:"전화번호"}

    const navigate=useNavigate();   
    const dispatch = useDispatch();
    const [info, setInfo] = useState(null);//DB에서 가져온 데이터 저장
    const [handleData,setHandleData] = useState(handleDatainit)//변경 데이터 저장용 변수
    
    const [editer,setEditer] = useState(editDatainit);//각 정보 중 어디가 바뀌었는지 저장. 이걸로 밑의 editerOnOff변수값 수정
    const [editerOnOff,setEditerOnOff] = useState(0);//회원정보중 어느거라도 수정 버튼 누르면 이 값이 바뀌어서 수정 저장 버튼 나오게 만드는 변수
    const [idChecker,setIdChecker] = useState(false);//아이디 변경 시 중복 방지를 위한 변수

    const[updateResult,setUpdateResult] = useState(0);//회원정보 수정 후 데이터 새로고침을 위한 변수

    const [dataChangeButtonOnOff,setDataChangeButtonOnOff] = useState(dataChangeButtonOnOffInit)//데이터 인풋박스 띄우는 버튼 ON/OFF
    const [postCodeChanger,setPostCodeChanger]=useState(0);//uaddress_main 초기화용 변수
    const [mainAddressVar,setMainAddressVar] = useState({"mainAddress":"","postcode":""});//
    // const {handleClick} = usePostCode(mainAddressVar,setMainAddressVar); // 리턴이 handleclick임

    const handleChange=(e)=>{
        const {name,value} = e.target
        setHandleData({...handleData,[name]:value})
        console.log(handleData)
        if(name ==="uid")
        {
            setIdChecker(false);//ID값 변경되면 다시 체크하게 만들기
        }
        if(value==="")
        {
            setEditer({...editer,[name]:0})//입력창 열고 변화가 없으면 데이터 변화 없는 취급
        }
        else
        {
            setEditer({...editer,[name]:1})
        }
    }

    const loginInfoString = localStorage.getItem("loginInfo");
    let socialLogin = false;
    let Json_loginInfo = null;

    if (loginInfoString) {
        Json_loginInfo = JSON.parse(loginInfoString);
        socialLogin = Json_loginInfo.isSocial;
    }

    const dataFixer = async() =>{//원본데이터, 변경데이터 넘겨서 해당 내용 바꾸기
        //아이디 중복확인 후 중복 없으면 전달하기
        if(editer["uid"]===1 && !idChecker){
            Swal.fire({icon:"error", text:"아이디 중복체크 하세요"})
        }
        else
        {
            const idIncludehandleData = {...handleData,["includedId"]:info.uid}
            const result = await updateUser(idIncludehandleData)//데이터 백엔드로 전달
            setHandleData(handleDatainit);//이후 작성한 데이터 초기화
            setEditerOnOff(0);
            if(result===1)
            {
                setUpdateResult(prev => prev+1);//updateUser를 넣으면 1값 유지되고, useEffect 작동 안해서 이렇게 변경
            }
        }
    }

    //회원탈퇴 문의 후 탈퇴시키는 함수
    const idDrop = async() =>{
        const idIncludehandleData = {...info}
        const userResponse = window.confirm("회원 탈퇴 하시겠습니까?");
        if(userResponse)
        {
            console.log(idIncludehandleData);
            const result = await IdDrop(idIncludehandleData)
            dispatch(getLogout());
            navigate('/');
        }
        else
        {
            Swal.fire({icon : "info", text:"회원 탈퇴를 취소하였습니다."})
        }
    }

    //아이디 중복검사 함수
    const IdDupleCheck = async() => {
        const duplResult = await idDuplCheck(handleData.uid);
        
        if(!duplResult){//duplResult=true면 중복있음, false면 중복없음
        //!duplResult은 중복이 없을때 true가 됨
            // setIdDupl(true);
            setIdChecker(true);
        }
        else{
            handleData.uid="";
            Swal.fire({icon : "error", text:"아이디 중복! 다시 입력해주세요"});
            // inputRefs.idRef.current.focus();
        }
    }


    useEffect(()=>{
        let result;
        const loginInfo = localStorage.getItem("loginInfo");
        if (!loginInfoString) // 로그인 정보가 null인 경우
        {
            navigate('/');
            return; // 리다이렉션 후 이후 코드가 불필요하게 실행되는 것을 방지
        }
        const Json_loginInfo = JSON.parse(loginInfo);
        //isLogin하면 스프링이 데이터를 제대로 못받아서 loggedIn으로 변경.
        const loginInfo_goingback={ uid : Json_loginInfo.userId, loggedIn : Json_loginInfo.isLogin, socialDupl : Json_loginInfo.isSocial}
        const getUserInfo = async() =>{
            result = await getInfo(loginInfo_goingback);
            result["upass"] = "패스워드는 비밀입니다"
            setInfo(result)
        }
        getUserInfo();
    },[updateResult])
    
    //변화가 생겨서 editer의 값이 한개라도 바뀌면 그걸 editerOnOFF에 추가.
    useEffect(()=>{
        let editerOnOff_changer = 0
        for( const [key, value] of Object.entries(editer))
        {
            editerOnOff_changer=editerOnOff_changer+value
            setEditerOnOff(editerOnOff_changer);
        }
    },[editer])


    //변경 창 여는 함수
    const DataChangeOpen = (e) =>{
        const{name} = e.target;
        setDataChangeButtonOnOff({...dataChangeButtonOnOff,[name] : true})
    }
    const DataChangeClose = (e) =>{
        const{name} = e.target;
        setDataChangeButtonOnOff({...dataChangeButtonOnOff,[name] : false})
        if(name==="uaddress")
        {
            handleChange({target:{name:"uaddress_sub",value:""}})
            setPostCodeChanger(1);//uaddress_main 초기화 작업을 위해 세팅
            setMainAddressVar({"mainAddress":"","postcode":""})
        }
        else
        {
            handleChange({target:{name:name,value:""}})
        }
    }


    //여기도 변경 필요할듯?
    useEffect(() => {
        if (mainAddressVar.mainAddress && dataChangeButtonOnOff['uaddress']) {
            handleChange({
                target: {
                    name: 'uaddress_main',
                    value: mainAddressVar.mainAddress + " *** " + mainAddressVar.postcode
                }
            });
        }
        if(postCodeChanger===1)
        {
            handleChange({
                target: {
                    name: 'uaddress_main',
                    value: ""
                }
            });
            setPostCodeChanger(0);
        }
    }, [mainAddressVar.mainAddress, postCodeChanger]);

    //이거 나중에 풀어야함
    // useEffect(()=>{
    //     setDataChangeButtonOnOff({...dataChangeButtonOnOff,[name] : false})
    //     if(name === "uaddress")
    //     {
    //         setMainAddressVar({"mainAddress":"","postcode":""});
    //     }
    // },[updateResult])


    if (!info) {
        // null을 반환하여 아무것도 렌더링하지 않거나, 로딩 메시지를 반환합니다.
        // MyPage에서 <li>로 감싸고 있으므로, <li> 안의 내용만 반환해야 합니다.
        return <>정보를 불러오는 중...</>; 
    }

    const VariableSetting= {
        "dataChangeButtonOnOff":dataChangeButtonOnOff,
        "nameString":nameString,
        "handleChange":handleChange,
        "DataChangeClose":DataChangeClose,
        "DataChangeOpen":DataChangeOpen,
        "IdDupleCheck":IdDupleCheck,
        "idChecker":idChecker,
        "info":info}

    return(
        <>
        <div className="myPageContainer">
            {/* <div className="sideBar">
                <h1 className="sideBarTitle">사이드 탭</h1>
                <ul className="sideBarList">
                    <Link to={`/cart`}>
                        <li>
                            자전거 장바구니
                        </li>
                    </Link>
                    <Link to={`/payment/order`}>
                        <li>
                            자전거 구매내역
                        </li>
                    </Link>
                    <li>여행지 찜목록</li>
                </ul>
            </div> */}
            <MyPage_SideBar/>
            <div className="infoSection">
                <h1 className="infoSectionTitle">개인정보 기록 및 수정</h1>
                <ul className="infoList">
                    {socialLogin?
                    <>
                        <li>소셜 로그인은 아이디를 공개하지 않습니다</li>
                        <li>소셜 로그인은 패스워드를 공개하지 않습니다</li>
                    </>:
                    <>
                    <MyPage_InputSection {...VariableSetting} name="uid"/>
                    <MyPage_InputSection {...VariableSetting} name="upass"/>

                        {/*<InfoBox info={info} name = "upass" handleDataChange={handleChange} updateResult={updateResult}/> */}
                    </>}                       
                    
                    {/* <InfoBox info={info} name = "uname" handleDataChange={handleChange} updateResult={updateResult}/>
                    <InfoBox info={info} name = "uage" handleDataChange={handleChange} updateResult={updateResult}/>
                    <InfoBox info={info} name = "ugender" handleDataChange={handleChange} updateResult={updateResult}/>
                    <InfoBox info={info} name = "uaddress" handleDataChange={handleChange} updateResult={updateResult}/>
                    <InfoBox info={info} name = "uemail" handleDataChange={handleChange} updateResult={updateResult}/>
                    <InfoBox info={info} name = "uphone" handleDataChange={handleChange} updateResult={updateResult}/> */}
                </ul>
                {editerOnOff>0?<button className="withdrawButton" onClick={dataFixer}>수정 내용 저장</button>:""}
                
                <button className="withdrawButton" onClick={idDrop}>회원 탈퇴</button>
            </div>
        </div>
        </>
        );
}