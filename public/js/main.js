
// phone





// function
function ValidateEmail()
{
	var inputText = document.getElementById('email').value;
	var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(inputText.match(mailFormat)){
		return true;
	}
	else{
		return false;
	}
}

function ValidatePhone(){
	var inputPhone = document.getElementById('telephone').value;

	var phoneFormat = /^05/;
	if(inputPhone.match(phoneFormat)){
		return true;
	}else{
		return false;
	}
}

function ValidateLetters(word){
	var inputLetters = word;
	var lettersFormat = /^[א-ת\s]+$/;
	if(inputLetters.match(lettersFormat)){
		return true;
	}else{
		return false;
	}
}

function ValidateMessage(word){
	var inputLetters = word;
	var lettersFormat =/^[A-Za-z]*$/


	if(inputLetters.match(lettersFormat)){
		return false;
	}else{
		return true;
	}
}



function clearFirstName(){
	document.getElementById('firstNameError').style.display='none';
	document.getElementById('FirstName').style.border='1px solid black';
}

function clearLastName(){
	document.getElementById('lastNameError').style.display='none';
	document.getElementById('LastName').style.border='1px solid black';
}

function clearTelephone(){
	document.getElementById('telephoneError').style.display='none';
	document.getElementById('telephone').style.border='1px solid black';
}

function clearEmail(){
	document.getElementById('emailError').style.display='none';
	document.getElementById('email').style.border='1px solid black';
}


function toggle1(){
	let checkbox1 =  document.getElementById("checkbox1").checked;

	if(checkbox1===false){
		document.getElementById('checkbox1Error').style.display='block';
			return false
	}else{
		document.getElementById('checkbox1Error').style.display='none';
	}
}




function validateForm(){
	var count=0;

	 var styles='input:focus {background-color:red}';


	var LastName = document.getElementById("LastName").value;
	if(ValidateLetters(LastName)===false){
		document.getElementById('lastNameError').innerHTML='שם משפחה הינו שדה חובה - אותיות בעברית בלבד';
		document.getElementById('lastNameError').style.display='block';
		document.getElementById('LastName').style.border='1px solid red';
		count++;
	}


	// email validation

	if(ValidateEmail()===false){
		document.getElementById('emailError').innerHTML='שדה דואר אלקטרוני הינו שדה חובה - מבנה כתובת דוא"ל';
		document.getElementById('emailError').style.display='block';
		document.getElementById('email').style.border='1px solid red';
		count++;

	}

	if(ValidatePhone()===false){
		// document.getElementById('telephoneError').innerHTML='טלפון סלולרי הינו שדה חובה - 10 ספרות';
		document.getElementById('telephoneError').innerHTML="שדה טלפון נייד הינו שדה חובה – מספר תקין בן 10 ספרות";

		document.getElementById('telephoneError').style.display='block';
		document.getElementById('telephone').style.border='1px solid red';
		count++;
	}


	var FirstName = document.getElementById("FirstName").value;
	if(ValidateLetters(FirstName)===false){
		document.getElementById('firstNameError').innerHTML='שם פרטי הינו שדה חובה - אותיות בעברית בלבד';
		document.getElementById('firstNameError').style.display='block';
		document.getElementById('FirstName').style.border='1px solid red';
		count++;
	};





	let checkbox1 = document.getElementById("checkbox1").checked;


	console.log(checkbox1)

	if(checkbox1===false){
		document.getElementById('checkbox1Error').innerHTML="יש לאשר את רישום פרטייך במאגר";
		document.getElementById('checkbox1Error').style.display='block';
			count++;
	}


console.log(count)


	if(count===0){
		return true;

	}
	console.log(count)
	return false
}
