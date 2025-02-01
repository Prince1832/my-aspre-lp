document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("referrer").value = window.location.href;
  });
  document.addEventListener("DOMContentLoaded", function () {
    var imgConts = document.querySelectorAll(".container__img-holder");
    var imgPopup = document.querySelector(".img-popup");
    var popupImage = imgPopup.querySelector("img");
    var closeBtn = imgPopup.querySelector(".close-btn");
    imgConts.forEach(function (imgCont) {
      imgCont.addEventListener("click", function () {
        var img_src = this.querySelector("img").getAttribute("src");
        popupImage.setAttribute("src", img_src);
        imgPopup.classList.add("opened");
      });
    });
    closeBtn.addEventListener("click", function () {
      imgPopup.classList.remove("opened");
      popupImage.setAttribute("src", "");
    });
    popupImage.addEventListener("click", function (e) {
      e.stopPropagation();
    });
    imgPopup.addEventListener("click", function (e) {
      if (e.target === imgPopup) {
        imgPopup.classList.remove("opened");
        popupImage.setAttribute("src", "");
      }
    });
  });
  const dialog = document.getElementById("dialog");
  const openButtons = document.querySelectorAll(".show-dialog");
  const closeBtn = dialog.querySelector(".close");
  const backdrop = document.querySelector(".backdrop");
  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      dialog.showModal();
      backdrop.classList.add("open");
    });
  });
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
    backdrop.classList.remove("open");
  });
  dialog.addEventListener("click", function (event) {
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (!isInDialog) {
      dialog.close();
    }
  });
  
  
  document.getElementById("currentYearInline").textContent =
    new Date().getFullYear();
  function validateName(formId) {
    var nameInput = document.querySelector(`#${formId} #name`);
    var nameError = document.querySelector(`#${formId} #nameError`);
    var name = nameInput.value;
    console.log(name ,'name' ,"id",formId);
  
    nameInput.classList.remove("error-border");
    nameError.innerHTML = "";
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      nameInput.classList.add("error-border");
      nameError.innerHTML = "Please enter a valid name";
      return !1;
    }
    return !0;
  }
  function validateEmail(formId) {
    var emailInput = document.querySelector(`#${formId} #email`);
    var emailError = document.querySelector(`#${formId} #emailError`);
    var email = emailInput.value;
    console.log(email,"email",formId);
  
    emailInput.classList.remove("error-border");
    emailError.innerHTML = "";
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailInput.classList.add("error-border");
      emailError.innerHTML = "Please enter a valid email address";
      return !1;
    }
    return !0;
  }
  function validatePhone(formId) {
    var phoneInput = document.querySelector(`#${formId} #phone`);
    var phoneError = document.querySelector(`#${formId} #phoneError`);
    var phone = phoneInput.value;
    console.log(phone ,"phone" ,formId);
    
    phoneInput.classList.remove("error-border");
    phoneError.innerHTML = "";
    if (phone.length < 10 || phone.length > 12) {
      phoneInput.classList.add("error-border");
      phoneError.innerHTML = "Enter valid number (10 to 12 digits)";
      return !1;
    }
    return !0;
  }
  function validateFile(formId) {
    var fileInput = document.querySelector(`#${formId} #resume`);
    var fileError = document.querySelector(`#${formId} #fileError`);
    var file = fileInput.files[0];
    fileError.innerHTML = "";
    if (!file) {
      fileError.innerHTML = "Please select a file";
      fileInput.classList.add("error-border");
      return !1;
    }
    var fileType = file.type;
    if (
      fileType === "application/pdf" ||
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      fileError.innerHTML = "";
      fileInput.classList.remove("error-border");
      return !0;
    } else {
      fileError.innerHTML = "Please select a PDF, DOC, or DOCX file";
      fileInput.classList.add("error-border");
      return !1;
    }
  }
  function handleFormSubmit(event, formId) {
    event.preventDefault();
    const form = document.getElementById(formId);
    console.log(form,'djfkdshfksdfjsdfhksdfjhsd')
    const submitBtn = document.querySelector(`#${formId} .submit-btn`);
    submitBtn.disabled = !0;
    const formAction = form.getAttribute("action");
    if (formId == "career-form") {
      result =
        validateEmail(formId) &&
        validatePhone(formId) &&
        validateName(formId) &&
        validateFile(formId);
    } else {
      result =
        validateEmail(formId) && validatePhone(formId) && validateName(formId);
    }
    if (result) {
      grecaptcha.ready(function () {
        grecaptcha
          .execute("6Lci2GoqAAAAALpT_GZ0unBmCI8DKvWvPRi2QELw", {
            action: "submit",
          })
          .then(function (token) {
            
  
            const formData = new FormData(form);
            formData.append("token", token);
            formData.append("referrer ", window.location.href);
            const xhr = new XMLHttpRequest();
            xhr.open("POST", `${formAction}`, !0);
            xhr.setRequestHeader(
              "Content-Type",
              "application/x-www-form-urlencoded"
            );
            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  submitBtn.disabled = !1;
                  window.location.href = "/thank-you";
                  form.reset();
                } else {
                  const mess = document.querySelector(`#${formId} .form-message`);
                  mess.textContent = xhr.responseText;
                  mess.style.display = "block";
                  mess.style.color = "red";
                  submitBtn.disabled = !1;
                }
              }
            };
            xhr.send(new URLSearchParams(formData));
          });
      });
    } else {
      const mess = document.querySelector(`#${formId} .form-message`);
      mess.textContent =
        "Fill all the fields properly before submitting the form";
      mess.style.display = "block";
      mess.style.color = "red";
      submitBtn.disabled = !1;
    }
  }
  const toggleMenu = document.querySelector(".sovorun-navbar__toggle-menu");
  const mobNavbar = document.querySelector(".mob-navbar");
  mobNavbar.style.top = "-250px";
  if (mobNavbar.style.top === "80px") {
    mobNavbar.style.top = "-250px";
  } else {
    mobNavbar.style.top = "80px";
  }
  