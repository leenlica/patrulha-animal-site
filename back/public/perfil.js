const handleChangeImage = async (e) => {
  e.preventDefault();
  const file = document.getElementById("imageProfile").files[0];
  const token = localStorage.getItem('token');

  const sendData = new FormData();
  sendData.append("image", file);

  const response = await fetch("http://localhost:3000/users/image", {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: sendData
  });
  const data = await response.json();
  const user = JSON.parse(localStorage.getItem('user'))
  user.imagem = data.path
  localStorage.setItem("user", JSON.stringify(user))

  console.log(data);
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("formImage");
  form.addEventListener("submit", handleChangeImage);

  const userImage = document.getElementById("user-avatar");
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user.imagem) return;
  userImage.src = user.imagem;
});