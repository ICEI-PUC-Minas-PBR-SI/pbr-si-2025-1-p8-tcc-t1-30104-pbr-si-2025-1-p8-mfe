<template>
  <section class="without-auth">
    <div class="notification is-light has-text-centered">
      Esse Microfrontend exibe seu conteúdo independente do usuário estar autenticado ou não.
    </div>

    <div class="without-auth__content box">
      <div class="field">
        <label class="label">Field 01</label>
        <div class="control">
          <input class="input" placeholder="Field 01" type="text" />
        </div>
      </div>

      <div class="field">
        <label class="label">Field 02</label>
        <div class="control">
          <input class="input" placeholder="Field 02" type="text" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.without-auth {
  .box {
    box-shadow: none;
    border: 1px solid #404654;
  }
}
</style>
