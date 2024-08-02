<script setup>
import { reactive, ref } from 'vue'
import { Choices } from '@/lib/choicesSelect'
import { FormLayout } from '@/lib/formConfig'
import { CreateOrder } from '@/models/orders/order.module'
import { useOrderStore } from '@/stores/orders'
import { RulesCreateOrder } from '@/lib/formConfig'
import { PlusOutlined } from '@ant-design/icons-vue'
import HeaderPages from '@/components/HeaderPages.vue'

const formRef = ref();
const emit = defineEmits(['closeModal'])
const orderData = reactive(new CreateOrder())
const { dessertChoice, cakeTypeChoice, cupcakesTypeChoice, fillingChoice } = Choices
const { addOrder } = useOrderStore()

const handleFinish = (data) => {
  data.status = 'inProcessing'
  const formData = new FormData()
  Object.keys(data).forEach(key => {
    if (key === 'photos' && data[key]) {
      formData.append('photos', data[key])
    } else {
      formData.append(key, data[key])
    }
  })
  addOrder(data)
  emit('closeModal')
}

const ChangeHandler = () => {
  if (orderData.dessert === 'cake') {
    orderData.cupcakesType = ''
    orderData.filling = ''
    orderData.quantity = null
  }

  if (orderData.dessert === 'cupcake') {
    orderData.cakeType = ''
  }
}

const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const handlePreview = async file => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};

const handleFinishFailed = (errors) => {
  console.log(errors)
}

const handlePhotoChange = (info) => {
  if (info.file.status === 'done') {
    orderData.photos = info.file.originFileObj
  }
}
</script>

<template>
  <div class="mt-8">
    <HeaderPages 
      title="Создание заказа"
      btn-text="Вернуться к списку заказов"
      url="/orders/list"
    />
    <a-card class="w-full max-w-[500px] sm:max-w-[375px] md:max-w-[500px] mx-auto mt-8">
      <a-form
        ref="formRef"
        autocomplete="off"
        :model="orderData"
        :rules="RulesCreateOrder(orderData)"
        v-bind="FormLayout"
        @finish="handleFinish(orderData)"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item label="Изделие" name="dessert">
          <a-select ref="select" v-model:value="orderData.dessert" @change="ChangeHandler()" >
            <a-select-option :value="item.value" v-for="(item, i) of dessertChoice" :key="i">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
  
        <a-form-item label="Торт" v-if="orderData.dessert === 'cake'" name="cakeType">
          <a-select ref="select" v-model:value="orderData.cakeType">
            <a-select-option :value="item.value" v-for="(item, i) of cakeTypeChoice" :key="i">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
  
        <a-form-item label="Капкейк" v-if="orderData.dessert === 'cupcake'" name="cupcakesType">
          <a-select ref="select" v-model:value="orderData.cupcakesType">
            <a-select-option :value="item.value" v-for="(item, i) of cupcakesTypeChoice" :key="i">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
  
        <a-form-item label="Начинка" v-if="orderData.dessert === 'cupcake'" name="filling">
          <a-select ref="select" v-model:value="orderData.filling">
            <a-select-option :value="item.value" v-for="(item, i) of fillingChoice" :key="i">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
  
        <a-form-item label="Количество" v-if="orderData.dessert === 'cupcake'" name="quantity">
          <a-input-number :min="9" v-model:value="orderData.quantity" />
        </a-form-item>
  
        <a-form-item label="Дата" name="date">
          <a-date-picker placeholder="" v-model:value="orderData.date" />
        </a-form-item>
  
        <a-form-item label="Время" name="time">
          <a-time-picker placeholder="" v-model:value="orderData.time" format="HH:mm" />
        </a-form-item>
  
        <a-form-item label="Примечания" name="notes">
          <a-textarea type="text" autoSize v-model:value="orderData.notes" />
        </a-form-item>
  
        <a-form-item label="Фото" name="photo">
          <a-upload
            name="photo"
            :before-upload="file => { orderData.photos = file; return false; }"
            list-type="picture-card"
            @change="handlePhotoChange"
            @preview="handlePreview"
            multiple
          >
          <div>
            <plus-outlined />
            <div style="margin-top: 8px">Загрузить фото</div>
          </div>
          </a-upload>
          <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-form-item>
  
        <div class="flex justify-evenly">
          <a-button type="primary" html-type="submit">Создать заказ</a-button>
        </div>
      </a-form>
    </a-card>
  </div>
</template>
