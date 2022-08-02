<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
    >
      <div class="form">
        <el-form
          ref="formData"
          :model="formData"
          :rules="formRules"
          label-width="120px"
          style="margin:10px;width:auto"
        >
          <el-form-item label="收支类型: ">
            <el-select
              v-model="formData.ieType"
              clearable
              placeholder="请选择收支类型"
            >
              <el-option
                v-for="(item,index) in format_type_list"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="收支描述"
            prop="describe"
          >
            <el-input
              v-model="formData.ieDescribe"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="收入: "
            prop="income"
          >
            <el-input
              v-model="formData.income"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="支出: "
            prop="expend"
          >
            <el-input
              v-model="formData.expend"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="现金余额: "
            prop="cash"
          >
            <el-input
              v-model="formData.cash"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="备注: "
            prop="remark"
          >
            <el-input
              v-model="formData.remark"
              clearable
              type="textarea"
            ></el-input>
          </el-form-item>

          <el-form-item class="text-right">
            <el-button @click="dialog.show = false">取消</el-button>
            <!--onSubmit()中的参数字符串是 data(){}中的表单数据结构-->
            <el-button
              @click="onSubmit('formData')"
              type="primary"
            >提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "addDialog", //注意此处不能和已有HTML标签重名,,否则报错
  props: {
    dialog: Object,
    formData: Object, //父组件调用子组件的标签中所添加的属性，要在这里声明。
  },
  data() {
    return {
      formRules: {
        ieDescribe: [
          { required: true, message: "收支描述不能为空!", trigger: "blur" },
        ],
        income: [{ required: true, message: "收入不能为空!", trigger: "blur" }],
        expend: [{ required: true, message: "支出不能为空!", trigger: "blur" }],
        cash: [{ required: true, message: "现金不能为空!", trigger: "blur" }],
      },
      format_type_list: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账",
        "借贷",
      ],
    };
  },
  methods: {
    onSubmit(formData) {
      //已在声明时在参数列表中注入待添加的 formData 数据
      this.$refs[formData].validate((valid) => {
        if (valid) {
          const url =
            this.dialog.option === "add" ? `add` : `update/${this.formData.id}`;
          this.$axios
            .post(`/api/profile/` + url, this.formData)
            .then((res) => {
              //$message 是 element 已注册的全局方法
              this.$message({
                message: this.dialog.option === "add" ? "添加成功" : "编辑成功",
                type: "success",
              });
            })
            .catch((err) => {
              const errInfo =
                this.dialog.option === "add" ? "添加出错: " : "编辑出错: ";
              console.log(errInfo, err);
            });

          //props 中的属性可以当作 data(){} 中的数据来对待
          this.dialog.show = false;

          //子组件声明一个叫 update 的方法，由父组件绑定实际函数
          this.$emit("update");
        }
      });
    },
  },
};
</script>

<style>
</style>

