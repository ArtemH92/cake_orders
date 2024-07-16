<template>
  <div class="container mx-auto">
    <header>
      <nav>
        <ul class="flex justify-between">
          <li><router-link to="/login">Авторизация</router-link></li>
          <li><router-link to="/register">Регистрация</router-link></li>
          <li><router-link to="/home">Домашняя</router-link></li>
          <li><router-link to="/orders/list">Заказы</router-link></li>
          <li><router-link to="/orders/add">Добавить заказ</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>