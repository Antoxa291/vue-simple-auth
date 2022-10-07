<template>
  <v-app>
    <v-app-bar absolute app color="white" elevate-on-scroll>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/">Home</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link v-if="isAuthenticated" class="logout" to="/logout"
        >Log out<v-icon>mdi-logout</v-icon></router-link
      >
      <router-link v-else class="login" to="/login"
        >Log in<v-icon>mdi-login</v-icon></router-link
      >
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>

      <alert-layout v-if="isAlert" :message="message" />
    </v-main>
  </v-app>
</template>

<script>
import AlertLayout from "@/layouts/alert";
import { mapState, mapGetters } from "vuex";

export default {
  name: "App",
  components: { AlertLayout },

  computed: {
    ...mapGetters(["isAuthenticated", "isAlert"]),
    ...mapState({
      message: (state) => state.message,
    }),
  },
};
</script>

<style lang="scss">
a {
  text-decoration: none;
}
.login,
.logout {
  display: flex;
  min-width: 90px;
  justify-content: space-around;
}
.v-toolbar__content {
  box-shadow: 0px 5px cornflowerblue;
}
</style>
