<template>
  <div>
    <div class="modal-backdrop fade show"></div>
    <div class="modal">
      <div class="modal-dialog img-upload-modal" role="document">
        <div class="modal-content" style="border-radius: 2px; border: unset">
          <div class="modal-body">
            <div v-show="isImage" class="avatar-cropper-image-container">
              <img id="cropper" :src="image">
            </div>

            <div v-show="!isImage">
              <h4 class="mb-3">Image Upload</h4>
              <label for="file" class="w-100" style="cursor: pointer">
                <form class="dropzone dz-clickable" id="my-dropzone">
                  <div class="dz-message d-flex flex-column text-center">
                    <i class="bi bi-upload text-muted"></i>
                    <h6>Upload Image</h6>
                  </div>
                </form>
              </label>
              <input id="file" style="display: none" type="file" @change="fileChange">
            </div>
            <div class="d-flex justify-content-between pt-3">
              <div>
                <button class="btn btn-outline-danger me-1" @click="$emit('close')">Cancel</button>
              </div>
              <div>
                <button class="btn btn-outline-white me-1" @click="uploadImg">Change</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { mapGetters } from 'vuex';

export default {
  name: "avatarUpload",
  data() {
    return {
      file: File,
      isImage: false,
      image: false,
      cropper: undefined,
      dataUrl: undefined
    }
  },
  computed: {
    displayImage() {
      if (this.image) {
        return this.image;
      }
      return null;
    }
  },
  mounted() {
    const imageObject = document.querySelector("#cropper");
    this.cropper = new Cropper(imageObject, {
      aspectRatio: 1,
      autoCropArea: 1,
      viewMode: 1,
      movable: false,
      zoomable: false
    });
  },
  methods: {
    fileChange(e) {
      this.isImage = true;
      this.$forceUpdate();
      let image;

      if (e.target.files && e.target.files.length) {
        [image] = e.target.files;
      }

      this.image = URL.createObjectURL(image);
      this.cropper.replace(this.image);
      document.getElementById(e.target.id).value = "";
    },
    uploadImg() {
      if (this.isImage) {
        const that = this;
        const img = this.cropper.getCroppedCanvas();
        const reader = new FileReader();

        img.toBlob(blob => {
          reader.readAsDataURL(blob);

          reader.onloadend = () => {

            that.resizeImage(reader.result, 200, 200).then(base64 => {
              this.$emit('upload', base64);
            });
          }
        })
      } else {
        this.$store.dispatch("Alerts/alert", {
          type: 'error',
          title: 'No image selected',
          message: 'Pls select a image to upload'
        });
      }
    },
    resizeImage(data, width, height) {
      console.log('upload!');

      let _data = data;
      let that = this;
      return new Promise(resolve => {
        const img = document.createElement("img");

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0,0, width, height);
          const dataURI = canvas.toDataURL();

          if (dataURI.length > 61486) {
            that.resizeImage(_data, width - 50, height - 50).then(rezied => resolve(rezied));
          } else {
            console.log(dataURI);
            resolve(dataURI);
          }
        }

        img.src = data;
      })
    }
  }
}
</script>

<style scoped>
.modal {
  display: unset !important;
}

.img-upload-modal {
  position: fixed;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 600px;
  height: 630px;
  padding: 25px;
}

.dropzone {
  border: 2px dashed #dedede;
  border-radius: 2px;
  background: #f5f5f5;
  height: 10rem;
}

.dropzone i{
  font-size: 2rem;
  margin-top: 2rem;
}

.dropzone .dz-message {
  color: rgba(0,0,0,.54);
  font-weight: 500;
  font-size: initial;
  text-transform: uppercase;
}

.avatar-cropper-image-container {
  position: relative;
  max-width: 400px;
  height: 300px;
}
</style>
