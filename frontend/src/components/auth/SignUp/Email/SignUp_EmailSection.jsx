import { SignUp_InputBox } from "../InputBox/SignUp_InputBox";
import { SignUp_EmailSelect } from "./SignUp_EmailSelect";

export function SignUp_EmailSection({formData,handleChange,sharedData}){
    console.log(sharedData)
    return(
        <>
        <div className = "EmailAddressBox">
            <div className = "EmailAddressFront">
                <SignUp_InputBox id="emailAddress" type="text" name="emailAddress" {...sharedData}/>
            </div>
            <div className = "EmailAddressBack">
                {formData.emailList==="default"?<p></p>:<span>@</span>}
                <SignUp_EmailSelect formData={formData} handleChange={handleChange}/>
            </div>
        </div>
        </>
    )
}