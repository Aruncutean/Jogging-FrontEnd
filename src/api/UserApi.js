import Client from "./Client";


export function readAllUser(){
   return Client.get("/users")
};

export function readUser(id){
  return Client.get("/users/"+id)
};

export function login(email,password,remeber){
  return  Client.post("/sessions/create",{
        "session":{ 
            "email":email,
            "password":password,
            "remember_me":remeber,
           
          } 
    })
};


export function singUp(name,email,password,passwordConfirmation){
    return  Client.post("/users",{
          "user":{ 
              "name":name,
              "email":email,
              "password":password,
              "password_confirmation":passwordConfirmation,
              "rol":"normal"
            } 
      })
  };


  export function updateUser(id,name,email,rol){
    return  Client.put("/users/"+id,{
          "user":{ 
              "name":name,
              "email":email,
              "rol":rol
            } 
      })
  };
  
  
export function deleteUser(id)
{
  return Client.delete("/users/"+id);
}
     
export function logOutSesion()
{
  return Client.delete("sessions/destroy");
}
   