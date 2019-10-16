function addText() {
    const appendText = document.createElement("p");
    appendText.setAttribute("id", "grading-element-one-consequence")

    const textContent = document.createTextNode("I am adding this to the page!")

    appendText.appendChild(textContent);

    const nextLine = document.getElementById("p2");
    document.body.insertBefore(appendText, p2)
}