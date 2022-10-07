<template>
  <v-row class="auth-wrapper">
    <v-col sm="6" offset-sm="3">
      <v-form ref="form" v-model="isFormValid" @submit.prevent="validate">
        <v-card>
          <v-card-text>
            <v-text-field
              label="E-post"
              v-model="form.email"
              required
              :rules="emailRules"
            />

            <v-text-field
              label="Passord"
              v-model="form.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              required
              :rules="pwdRules"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            />
          </v-card-text>

          <v-card-actions>
            <router-link to="#">Glemt passord?</router-link>
            <v-spacer></v-spacer>
            <v-btn type="submit" :loading="loading" :disabled="!isFormValid">
              LOG INN
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Validation from "@/mixins/Validation";

export default {
  name: "LoginView",
  mixins: [Validation],
  data() {
    return {
      isFormValid: false,
      showPassword: false,
      form: {
        email: null,
        password: null,
      },
    };
  },

  computed: {
    ...mapState({
      loading: (state) => state.loading,
    }),
  },

  methods: {
    ...mapActions(["login"]),

    async validate() {
      if (this.$refs.form.validate()) {
        await this.login(this.form);
      }
    },
  },
};
</script>
