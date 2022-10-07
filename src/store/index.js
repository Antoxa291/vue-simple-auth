import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router/index";

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    authenticated: null,
    defaultUser: [
      {
        email: 'test@test.com',
        password: 'test123'
      },
      {
        email: 'admin@test.com',
        password: 'admin'
      },
    ],
    message: null,
    loading: false,
    user: {},
  };
};

const store = new Vuex.Store({
  state: getDefaultState,

  getters: {
    isAlert: (state) => !!state.message,
    isAuthenticated: (state) => !!state.authenticated || localStorage.getItem("authenticated"),
  },

  actions: {
    async login({ commit, state }, authDetails) {
      commit("SET_LOADING", true);

      setTimeout(() => {
        let user = state.defaultUser.find((el) => {
          return el.email === authDetails.email;
        });
        if (!user) {
          commit("SET_MESSAGE", 'Invalid credentials');

          setTimeout(() => {
            commit("SET_MESSAGE", null);
          }, 3000)

          commit("SET_LOADING", false);
        } else if (user.password === authDetails.password) {
          commit("LOGIN_USER", authDetails);
          commit("SET_AUTH", true);
          commit("SET_MESSAGE", null);

          localStorage.setItem("authenticated", true);

          router.push("/").catch(() => { });
        }

      commit("SET_LOADING", false);
    }, 1000)
    },

    async logout({ commit }) {
      localStorage.removeItem("authenticated");
      commit("RESET_STATE");
    },
  },

  mutations: {
    LOGIN_USER(state, authDetails) {
      state.user = { ...authDetails };
    },

    SET_AUTH(state, status) {
      state.authenticated = status;
    },

    SET_LOADING(state, status) {
      state.loading = status;
    },

    SET_MESSAGE(state, message) {
      state.message = message;
    },

    RESET_STATE(state) {
      Object.assign(state, getDefaultState());
    }
  }
});

export default store;