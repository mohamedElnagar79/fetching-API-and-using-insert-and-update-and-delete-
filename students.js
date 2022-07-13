 async function fetchStudentsData(){
   let tableObj = document.createElement("table"); 
   let addbtn = document.querySelector("input[value=Add]")
   let  studentNameTextObj = document.querySelector("input[name=studentName]")
  //  let studentIdTextObj = document.querySelector("input[value=studentId]")
   document.body.append(tableObj);
    let tableRow=document.createElement("tr")   ;
   try {
       let response = await fetch("https://node-monge-iti-project.herokuapp.com/students")
       let studentsData = await response.json() ;
       //  add table header
       for (let item in studentsData[0]){
          if (item == "Name"){
              let tableTd = document.createElement("td");
              tableTd.innerText=item;
              tableRow.append(tableTd)
              tableObj.append(tableRow)
          }
          else if (item == "Department"){
            tableTd = document.createElement("td");
            tableTd.innerText=item;
            tableRow.append(tableTd)
            tableObj.append(tableRow)
          }
        }  //  end of table header
        // adding elements to table
        for (let student in studentsData){
          if(studentsData[student].Department!==null&&studentsData[student].Department !== undefined){
            let tableRow=document.createElement("tr")   ;
            tableTd = document.createElement("td");
            tableTd.innerText=studentsData[student].Name;
            tableRow.append(tableTd)
            tableObj.append(tableRow)
                //  add department Name
            tableTd = document.createElement("td");
            tableTd.innerText=studentsData[student].Department.Name;
            tableRow.classList.add(studentsData[student].Department.Name);
            tableRow.append(tableTd)
            tableObj.append(tableRow)
            // add delete btn
            tableTd = document.createElement("td");
            let deleteBtn = document.createElement("button")
            deleteBtn.innerText="Delete"
            tableTd.append(deleteBtn);
            tableRow.append(tableTd);
            tableRow.StId=studentsData[student]._id
            // console.log(tableRow.id=studentsData[student]._id)
          }
            
        }// end of table elements
        /* ************* post data ************  */ 
        addbtn.addEventListener("click",async function getData(){
              let departmentObj = document.querySelector("input[name=Department]:checked");

           let response = await fetch("https://node-monge-iti-project.herokuapp.com/students",{
               method: "post",
               body: JSON.stringify(
                 {
                   name:studentNameTextObj.value,
                   department:departmentObj.id
                  }
                 ),
               headers:{
                 "content-Type":"application/json"
               }
           });
           console.log(departmentObj.id)
           console.log(studentNameTextObj.value)
           let newStudent = await response.json();
           console.log(newStudent)
 
        })//end of post data
          // delete data
        tableObj.addEventListener("click",async function (event){
          if (event.target.localName == "button"){
            // console.log(event.target.parentElement.parentElement.StId)
            let users = await fetch("https://node-monge-iti-project.herokuapp.com/students",{
             method:"delete",
            body:JSON.stringify({
              id: event.target.parentElement.parentElement.StId
            }),
            headers:{
              "content-Type":"application/json"
            }
          })
          }
        })
   }//end of try
   catch(error){
     console.log(error)
   }

 
}