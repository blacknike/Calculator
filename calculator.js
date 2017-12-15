var container = document.getElementsByClassName('container')[0], 
    content = document.getElementsByTagName('p')[0], 
    counter = 0, 
    decimal = false; 
container.onclick = function(e){
    var target = e.target;
    if(target.nodeName.toLowerCase() === 'button'){
        var btnType = target.innerText;
        if(content.innerText == 'Error' && btnType != 'AC'){
            return;
        }
        if(btnType == 'AC'){
            decimal = false;
            content.innerText = '0';
            counter = 1;
        }else if(btnType == 'CE'){
            if(content.innerText != ''){
                if(content.innerText.length === 1){
                    content.innerText = '0';
                }else{
                    content.innerText = content.innerText.slice(0,-1);
                }
                counter--;
            }
        }else if(btnType == '='){
            var text = content.innerText;
            if(!text){
                return;
            }else{
                text = text.replace(/x/g,'*');
                var result;
                try{
                    result = eval(text) + '';
                    if(result.search(/\./) > 0){
                        decimal = true;
                        if(result.split('.')[1].length > 4){
                            result = (+result).toFixed(4);
                        }
                    }
                    content.innerText = result;
                    counter = result.length;
                }catch(e){
                    content.innerText = 'Error';
                }
            }
        }else{
            if(isNaN(+btnType) && btnType != '.'){
                decimal = false;
            }
            if(btnType == '.'){
                if(decimal){
                    return;
                }
                decimal = true;
            }
            if(content.innerText == '0' && (!isNaN(+btnType) ||
            btnType == '(' || btnType == ')')){
                content.innerText = '';
            }
            content.innerText += btnType;
            if(counter++ >= 15){
                alert('Too much chars');
            }
        }   
    }
}