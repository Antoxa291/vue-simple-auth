const Validation = {
  data: () => ({
    valid: false,
    emailRules: [
      v => String(v).trim().length >= 1
      ? /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(String(v).trim()) ? true : "Wrong e-mail." : "E-post påkrevd.",
    ],
    pwdRules: [
      v => v && String(v).trim().length >= 5 || "Minimum 5 characters.",
    ],
  }),
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};

export default Validation;
