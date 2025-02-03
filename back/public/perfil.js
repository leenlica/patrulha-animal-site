import API from './api.js';
import Auth from '../src/middleware/auth.js' ;

const form = document.querySelector('form');
 
let formMethod;
 
async function loadProfile() {
  const user = await API.read('/users/me');
 
  let image;
 
  if (user.image) {
    image = user.image.path;
 
    formMethod = 'put';
  } else {
    image = '/img/profile/avatar.png';
 
    formMethod = 'post';
  }
 
  document.querySelector('#user-avatar').src = image;
 
  document.querySelector('#dropdown-avatar').src = image;
 
  document.querySelector('#userId').value = user.id;
}
 
form.onsubmit = async (event) => {
  event.preventDefault();
 
  const image = new FormData(form);
 
  let newImage;
 
  if (formMethod === 'post') {
    newImage = await API.create('/users/image', image, true, true);
  } else if (formMethod === 'put') {
    newImage = await API.update('/users/image', image, true);
  }
 
  document.querySelector('#user-avatar').src = newImage.path;
 
  document.querySelector('#dropdown-avatar').src = newImage.path;
 
  form.reset();
};
 
if (Auth.isAuthenticated()) {
  loadProfile();
}