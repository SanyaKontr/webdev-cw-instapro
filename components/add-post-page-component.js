import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";

  const render = () => {
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
        <h3 class="form-title">Создать свой новый пост</h3>
        <div class="form-inputs">
          <div class="upload-image-container">
            <div class="upload=image">      
              <label class="file-upload-label secondary-button">
                <input type="file" class="file-upload-input"" style="display:none">
                Выберите фото
              </label>    
            </div>
          </div>
          <label>
            Добавьте комментарий:
            <textarea class="input textarea" rows="2" id="description"></textarea>
          </label>
          <button class="button" id="add-button">Добавить</button>
        </div>
      </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }


    document.getElementById("add-button").addEventListener("click", () => {
      const description = document.getElementById("description").value;

      onAddPostClick({
        description: description,
        imageUrl: imageUrl,
      });
    });
  };

  render();
};