let CurrentSlide = 0;
let MaxSlides = 0;

Setup();

function GetElemetByID(ID) {
	return document.getElementById(ID);
}

function CreateDiv() {
	return document.createElement("div");
}

function Setup() {
	// setup images here, easier to do with js
	let lightboxContainerDiv = GetElemetByID("lightboxContainer");
	let modalDiv = GetElemetByID("slidesGoHere");
	let thumbDiv = GetElemetByID("thumbnailsGoHere");
	let imgBasePath = "./images/thumb/eq";

	let rows = 2;
	let cols = 4;

	MaxSlides = rows * cols;
	CurrentSlide = 0;

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			let n = (i*cols) + j;

			// images shown on page that will activate the light box
			let imgContainer = CreateDiv();
			let img = document.createElement("img");
			let src = imgBasePath + n + ".jpg";

			img.className = "lbimg";
			imgContainer.className = "imgContainer";
			
			imgContainer.style.gridColumn = "line" + j + " / line" + j + "" + j;
			imgContainer.style.gridRow = "line" + i + " / line" + i + "" + i;

			img.src = src;
			img.addEventListener("click", function() {
				OpenSlideShow();
				SetSlide(n);
			});
			
			imgContainer.appendChild(img);
			lightboxContainerDiv.appendChild(imgContainer);

			// images in the actual slideshow
			let slideDiv = CreateDiv();
			let textDiv = CreateDiv();
			let slideImg = document.createElement("img");
			
			slideDiv.className = "slideDiv"
			textDiv.className = "textDiv"
			slideImg.className = "slideImg"
			
			slideImg.src = src;
			textDiv.textContent = (n+1) + " / " + (rows * cols);
			
			slideDiv.appendChild(textDiv);
			slideDiv.appendChild(slideImg);

			modalDiv.appendChild(slideDiv);

			// image thumbnails in the slideshow
			let thumbImgContainer = CreateDiv();
			let thumbImg = document.createElement("img");

			thumbImg.src = src;
			thumbImg.alt = "Gym equipment " + (n + 1) + ".";
			thumbImg.className = "thumbnail";

			thumbImg.addEventListener("click", function() {
				SetSlide(n);
			});
			
			thumbImgContainer.className = "thumbImgContainer";
			thumbImgContainer.style.gridColumn = "line" + j + " / line" + j + "" + j;
			thumbImgContainer.style.gridRow = "line" + i + " / line" + i + "" + i;

			thumbImgContainer.appendChild(thumbImg);
			thumbDiv.appendChild(thumbImgContainer);
		}
	}
}

function OpenSlideShow() {
	GetElemetByID("modal").style.display = "block";
}

function CloseSlideShow() {
	GetElemetByID("modal").style.display = "none";
}

function SetSlide(n) {
	CurrentSlide = n;
	if (CurrentSlide >= MaxSlides) {
		CurrentSlide = CurrentSlide % MaxSlides;
	}
	while (CurrentSlide < 0) {
		CurrentSlide = MaxSlides + CurrentSlide;
	}
	console.log(CurrentSlide);
	ShowSlides();
}

function PrevSlide() {
	SetSlide(CurrentSlide - 1);
}

function NextSlide() {
	SetSlide(CurrentSlide + 1);
}

function ShowSlides() {
	let slides = document.getElementsByClassName("slideDiv");
	let thumbnails = document.getElementsByClassName("thumbImgContainer");
	let captionText = GetElemetByID("caption");

	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display =  (i == CurrentSlide) ? "block": "none";
	}

	for (let i = 0; i < thumbnails.length; i++) {
		thumbnails[i].id = "";
	}

	thumbnails[CurrentSlide].id = "active";
	captionText.innerHTML = thumbnails[CurrentSlide].firstChild.alt;
}