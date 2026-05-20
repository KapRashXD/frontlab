<template>
  <div>
    <button @click="toggleLoading">Toggle loading</button>
        <button @click="toggleError">Toggle error</button>
        <button @click="clearItems">Clear items</button>
        <button @click="addSampleItems">Add sample items</button>
  </div>
  <div v-if="isLoading">Завантаження…</div>
        <div v-else-if="hasError">Помилка завантаження</div>
        <div v-else-if="items.length === 0">Немає даних</div>
        <ul v-else>
          <li v-for="(item, index) in items" :key="index">{{ item }}</li>
        </ul>

  <div>
    <button @click="isPanelVisible = !isPanelVisible">
      {{ isPanelVisible ? 'Сховати' : 'Показати' }} панель
    </button>
    <div class="panel" v-if="isPanelVisible">
      <p>v-if</p>
    </div>
    <div class="panel" v-show="isPanelVisible">
      <p>v-show</p>
    </div>
  </div>

  <div>
    <input v-model="newProductTitle" placeholder="Назва продукту" />
    <select v-model="newProductCategory">
      <option value="">Виберіть категорію</option>
      <option value="fruits">Фрукти</option>
      <option value="vegetables">Овочі</option>
    </select>
    <button @click="addProduct">Додати продукт</button>
    <ul class="products-list">
      <li v-for="product in products" :key="product.id" :class="{'fruit': product.category === 'fruits', 'vegetable': product.category === 'vegetables' }">
        {{ product.title }} ({{ product.category }})
        <button @click="removeProduct(product.id)">Видалити</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    data(){
      return{ 
        isLoading: false,
        hasError: false,
        items: ['Елемент 1', 'Елемент 2', 'Елемент 3'],

        isPanelVisible: true,

        products: [
          {id: 1, title: 'Яблуко', category: 'fruits' },
          {id: 2, title: 'Морква', category: 'vegetables' },
        ],
        newProductTitle: '',
        newProductCategory: 'fruits',
      }
    },
    methods: {
      toggleLoading(){
        this.isLoading = !this.isLoading;
        if(this.isLoading){
          this.hasError = false;
        }
      },
      toggleError(){
        this.hasError = !this.hasError;
        if(this.hasError){
          this.isLoading = false;
        }
      },
      clearItems(){
        this.items = [];
      },
      addSampleItems(){
        this.items = ['Елемент 1', 'Елемент 2', 'Елемент 3'];
      },
      addProduct(){
        if(this.newProductTitle && this.newProductCategory){
          const newProduct = {
            id: this.products.length + 1,
            title: this.newProductTitle,
            category: this.newProductCategory,
          };
          this.products.push(newProduct);
          this.newProductTitle = '';
          this.newProductCategory = 'fruits';
        }
      },
      removeProduct(id){
        this.products = this.products.filter(product => product.id !== id);
      }
    }
  }
</script>

<style scoped>
  .panel {
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 10px;
    width: 200px;
    text-align: center;
  }

  .products-list li.fruit {
    color: #1a8917;
    font-weight: bold;
  }
  .products-list li.vegetable {
    color: #e17a00;
    font-style: italic;
  }
</style>
