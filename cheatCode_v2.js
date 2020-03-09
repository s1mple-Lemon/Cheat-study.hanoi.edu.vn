var buttons = document.querySelectorAll('input[type="radio"]');
for(var i=0;i<buttons.length;i++){
    buttons[i].checked=true;
    buttons[i].onclick();
 }

curQuesIdList = []
curAnsIdList = []
for(i=0;i<testResultLocalObject.length;i++){
    curQuesIdList.push(testResultLocalObject[i].QuestionId);
    curAnsIdList.push(testResultLocalObject[i].AnswerId);
}
prevQuesIdList = []
prevAnsIdList = []

//ID đáp án nhỏ nhất trong một câu
MinID = 66;
MinID = MinID % 4;

runtime = 1 // Lần chạy
if (runtime == 1){
	prevQuesIdList = curQuesIdList;
	prevAnsIdList = curAnsIdList;
}else{
	prevQuesIdList = JSON.parse(localStorage.getItem("prevQuesID"));
	prevAnsIdList = JSON.parse(localStorage.getItem("prevAnsID"));
}

//Danh sách những câu trả lời sai
wrong = "1. 2. 3. 4. 5. 6. 7. 8. 9. 10. 11. 12. 13. 14. 15. 16. 17. 18. 19. 20. 21. 22. 23. 24. 25. 26. 27. 28. 29. 30. 31. 32. 33. 34. 35. 36. 37. 38. 39. 40. ";

WrongList = []
for(i=0;i<wrong.length;i++){
	if(wrong.charAt(i) == "."){
    	if(wrong.charAt(i-2) >= '0' && wrong.charAt(i-2) <= '9'){
        	WrongList.push(prevQuesIdList[parseInt(wrong.substr(i-2,2))-1]);
        }else{
        	WrongList.push(prevQuesIdList[parseInt(wrong.substr(i-1,1))-1]);
        }
    }
}

for(i=0;i<testResultLocalObject.length;i++){
    if(WrongList.includes(curQuesIdList[i])){
    	curAnsIdList[i] = (Math.floor((parseInt(curAnsIdList[i])-MinID)/4)*4+runtime+MinID-1).toString();
    }else{
		console.log(curQuesIdList[i]);
		for(j=0;j<prevQuesIdList.length;j++){
			if(curQuesIdList[i] == prevQuesIdList[j]){
				curAnsIdList[i] = prevAnsIdList[j];
				break;
			}
		}
	}
}

localStorage.setItem("prevQuesID",JSON.stringify(curQuesIdList));
localStorage.setItem("prevAnsID",JSON.stringify(curAnsIdList));

cheatCode = ""
for(i=0;i<curQuesIdList.length;i++){	
    SaveUserAnswer(curQuesIdList[i],curAnsIdList[i]);
    cheatCode = cheatCode + "SaveUserAnswer('"+curQuesIdList[i]+"','"+curAnsIdList[i]+"');\n";
}