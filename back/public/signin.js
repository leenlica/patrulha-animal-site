const forms = document.getElementById("login-form")

forms.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = Object.fromEntries(new FormData(forms));
    
    const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
    })

    if(response.status === 400){
        return alert("usuario nao encontrado")
    }

    const data = await response.json()
    console.log(data)
    localStorage.setItem("user", JSON.stringify(data.user))
    localStorage.setItem('authenticated', 'true');
    localStorage.setItem('userName', data.user.nome);
    localStorage.setItem('userEmail', data.user.email);
    localStorage.setItem("token", data.token)
    alert("logado com sucesso")
    window.location.href = "./home.html"
})