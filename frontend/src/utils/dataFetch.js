import axios from 'axios';

/**
 * 배열의 rows 그룹핑
 */
export const groupByRows = (array, number) => {
    const rows = array.reduce((acc, cur, idx) => { 
        if(idx % number === 0){
            acc.push([cur]); 
        }else {
            acc[acc.length-1].push(cur); 
        }
        return acc;
        
    }, []);

    return rows;
}

/**
 * axios 함수를 이용하여 데이터 가져오기
 */

export const axiosData = async(url) => { 
    const response = await axios.get(url);
    return response.data;
}

/**
 * fetch 함수를 이용하여 데이터 가져오기
 */

export const fetchData = async(url) => {
    const response = await fetch(url);
    const jsonData = await response.json(); 
    return jsonData;
}

////////////////////////////////////////////////

/**
 * axios 함수를 이용하여 백엔드 연동 처리 //DB 경우
 */

export const axiosGet = async (url) => {
    console.log("url => ", url);
    const response = await axios.get(url);
    console.log(response);

//    위 방식 또는
//    const response = await axios({
//        method:"GET",
//        url: url,
//        data: formData
//    })

    return response.data;
}