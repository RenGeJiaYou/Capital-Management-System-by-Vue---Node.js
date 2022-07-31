<template>
  <div class="dialog">
    <el-dialog
      title="添加资金条目"
      :visible.sync="dialog.show"
    ></el-dialog>
  </div>
</template>

<script>
export default {
  name: "addDialog", //注意此处不能和已有HTML标签重名,,否则报错
  props: {
    dialog: Object,
  },
  data() {
    return {
      formData: {},
    };
  },
};
</script>

<style>
</style>

