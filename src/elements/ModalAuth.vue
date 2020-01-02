<template>
<div>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container container">

          <div class="modal-header row">
            <slot name="header">
              <h2> Login!</h2>
                <b-button 
                variant="outline-danger"
                class="modal-default-button" @click="$emit('close')">
                x
              </b-button>
            </slot>
          </div>

          <div class="modal-body row">
            <slot name="body">
              <div class="row">
                  <input 
                    type="email" 
                    v-model="email_user"
                    :placeholder="email_user"
                    disabled="true" 
                    class="input" 
                    required>
                  <input 
                    type="password" 
                    v-model="password"
                    placeholder="Password" 
                    class="input" 
                    required>

                </div>
            </slot>
            </div>

          <!-- {{`${createText()}`}} -->
          <div class="modal-footer">
            <slot name="footer">
              <b-button 
              class="modal-default-button" @click="login()" 
              variant="success">
                login 
              </b-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>

</div>
</template>



<script>
import firebase from 'firebase'
export default {
  name: 'modal-auth',
  props: {
    email_user: {type: String}
  },
  data: function () {
    return {
      password: ''
    }
  },
  methods: {
    login () {
      console.log('auth')
      firebase.auth().signInWithEmailAndPassword(this.email_user, this.password).then((user) => {
        this.$emit('close')
        this.$parent.userLoggedIn = user.user.email
      }).catch((err) => {
        console.log(err)
        alert(err.message)
      })
    }
  }
}
</script>


<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.time-input > * {
  width: 25px;
} 
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 400px;
  width: 100%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>