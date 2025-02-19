import { useState } from 'react'



export default function UserSettings() {
    //where we will store string recieved from textboxes
    //email
    const [email, set_email] = useState();

    //password
    const [password, set_password] = useState({
        password: '',
        match: '',
    });

    //check if both strings are the same to make calls to backend

        //make call to backend







    //error handling for textboxes... kinda?
    //textboxes seem to still behave without these functions, but this changes the values of the useState variables
    /* 
        ... = spread 
            e.g. 
                arr1 = [1,2,3]
                arr2 = [...arr1, 4, 5] //now becomes [1, 2, 3, 4, 5]

        : = this assigns values to keys
            e.g.
                e.target now becomes
    
    */ 
    function handle_change (_event, num) {
        //error handling setting input to previous states as keys are entered
        switch(num){
            case 0:
                //if there is a previos state pass into set_email call
                return set_email((prev_state) => ({...prev_state, [_event.target.name]: _event.target_value}));
            case 1: 
                return set_password((prev_state) => ({...prev_state, [_event.target.name]: _event.target.value}));
            default:
                console.log("assigned num not added into handle_change function");
                break;
        }
    }
    

    //returning what needs to render
    return (
        <html className="min-h-screen bg-stone-900 flex justify-items-start columns-1">
            <body>
                
                <div>
                    <text className="text-white text-2xl bg-stone-900"> Email </text>
                    {/*add text box to get info*/}
                    <input className="" placeholder="Email" onChange={(_event) => handle_change(_event, 0)}/>
                    {/*button pertaining to email text box*/}
                    <button className="bg-[#ff6510] text-white rounded-md">Submit</button>
                </div>

                
                {/*Password handling*/}
                <div>
                    <text className="text-white text-2xl"> Password </text>
                </div>
                
                <div>
                    {/*passwords textbox and buttons*/}
                    <input type="password" name="password" className="" placeholder="Password" value={password.password} onChange={(_event) => handle_change(_event, 1)}/>
                </div>
                <div> 
                    {/*match password textbox and button*/
                        //name field must match field give in useState array
                        //we pass in the event onChange into the function
                    }
                    <input type="password" name="match" className="" placeholder="Match Password" value={password.match} onChange={(_event) => handle_change(_event, 1)}/>
                    <button className="bg-[#ff6510] text-white rounded-md">Submit</button>
                </div>


            </body>
        </html>
    )


}



