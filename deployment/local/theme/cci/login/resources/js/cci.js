function addCheckboxEvent() {
    if(document.getElementById("rememberMe").checked)
        document.getElementById("rememberMeWarning").style.display = "block";

    document.getElementById("rememberMe").addEventListener("change", function(){
        if(this.checked){
            document.getElementById("rememberMeWarning").style.display = "block";
        } else{
            document.getElementById("rememberMeWarning").style.display = "none";
        }
    });
}

