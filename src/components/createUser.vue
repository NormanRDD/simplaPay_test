<template>
  <div class="userWrapper">
    <div v-if="isCreated" class="currentUserWrapper">
      <ul style="text-align: left; list-style: none">
        <h4>Текущий пользователь</h4>
        <li v-for="item in user" :key="item">
          <p>{{ item }}</p>
        </li>
      </ul>
    </div>
    <div class="createUser__wrapper">
      <div v-if="isCreated === false" class="createUser__form">
        <validation-observer ref="form1">
          <form @submit.prevent="createUser">
            <h2>Создать пользователя</h2>
            <validation-provider v-slot="{ errors }" rules="required">
              <div>
                <span style="color: red">{{ errors[0] }}</span>
              </div>
              <input
                type="text"
                placeholder="Введите ФИО"
                v-model="create.fio"
              />
            </validation-provider>
            <validation-provider v-slot="{ errors }" :rules="`required|email`">
              <div>
                <span style="color: red">{{ errors[0] }}</span>
              </div>
              <input
                type="text"
                placeholder="Введите email"
                v-model="create.email"
              />
            </validation-provider>
            <div>
              <button>Создать</button>
            </div>
          </form>
        </validation-observer>
      </div>
      <div v-if="isCreated === true" class="createUser__form">
        <validation-observer ref="form2">
          <form @submit.prevent="editUser">
            <h2>Редактировать пользователя</h2>
            <validation-provider v-slot="{ errors }" rules="required">
              <div>
                <span style="color: red">{{ errors[0] }}</span>
              </div>
              <input type="text" placeholder="Введите ФИО" v-model="edit.fio" />
            </validation-provider>
            <validation-provider v-slot="{ errors }" :rules="`required|email`">
              <div>
                <span style="color: red">{{ errors[0] }}</span>
              </div>
              <input
                type="text"
                placeholder="Введите email"
                v-model="edit.email"
              />
            </validation-provider>
            <validation-provider v-slot="{ errors }" rules="required">
              <div>
                <span style="color: red">{{ errors[0] }}</span>
              </div>

              <input
                type="text"
                v-mask="'+7 (###) ###-##-##'"
                placeholder="Введите номер телефона"
                v-model="edit.phone"
              />
            </validation-provider>
            <div>
              <button>Изменить</button>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>
<script>
import { instance } from "../plugins/axios";
import adminInstance from "../plugins/axios";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  data() {
    return {
      user: "",
      isCreated: false,
      info: "",
      create: {
        fio: "",
        email: "",
      },
      edit: {
        fio: "",
        email: "",
      },
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    getUser() {
      try {
        instance
          .get("/user", {
            name: this.edit.fio,
            email: this.edit.email,
            phone: this.edit.email,
          })
          .then((response) => {
            this.user = response.data;
          });
      } catch (error) {
        console.log(error);
      }
    },
    editUser() {
      this.$refs.form2.validate().then((e) => {
        if (e) {
          try {
            instance
              .patch("/user", {
                name: this.edit.fio,
                email: this.edit.email,
                phone: this.edit.email,
              })
              .then((response) => {
                if (response.status === 200 || response.status === 201) {
                  alert("Пользователь успешно изменен");
                  location.reload();
                }
              });
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
    createUser() {
      this.$refs.form1.validate().then((e) => {
        if (e) {
          try {
            adminInstance
              .post("/user", {
                name: this.create.fio,
                email: this.create.email,
              })
              .then((response) => {
                if (response.status === 200 || response.status === 201) {
                  alert("Пользователь успешно создан");
                  localStorage.setItem("token", response.data.auth_key);
                  this.getUser();
                  this.isCreated = true;
                }
              });
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.getUser();
      this.isCreated = true;
    }
  },
};
</script>
<style scoped>
input {
  margin: 10px 10px;
}
</style>
