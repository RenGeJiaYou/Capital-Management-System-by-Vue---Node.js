<template>
  <div class="table-container">
    <!--表单区,筛选&添加按钮-->
    <div>
      <!--只有一行元素的表单-->
      <el-form
        :inline="true"
        ref="add_data"
      >
        <el-form-item class="rightBtn">
          <el-button
            type="primary"
            size="small"
            icon="view"
            @click="handleAdd()"
          >添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格区-->
    <div class="tableContainer">
      <el-table
        v-if="tableData.length>0"
        :data="tableData"
        class="table"
        stripe
        border
        fit
        show-header
        :header-cell-style="textCenter"
        :cell-style="textCenter"
        height="500px"
      >
        <!--序号-->
        <el-table-column
          label="序号"
          type="index"
          width="70%"
        ></el-table-column>

        <!--创建时间-->
        <el-table-column
          label="创建时间"
          prop="date"
          width="200%"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <!-- scope代表当前一行 -->
            <span style="margin-left: 10px">{{ scope.row.date |dateFilter }}</span>
          </template>
        </el-table-column>

        <!--收支类型-->
        <el-table-column
          label="收支类型"
          prop="ieType"
          width="90%"
        ></el-table-column>

        <!--收支描述-->
        <el-table-column
          label="收支描述"
          prop="ieDescribe"
          width="100%"
        ></el-table-column>

        <!--账户现金-->
        <el-table-column
          label="账户现金"
          prop="cash"
          width="60%"
        >
          <template slot-scope="scope">
            <span style="color: #4db3ff;">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>

        <!--收入-->
        <el-table-column
          label="收入"
          prop="income"
          width="60%"
        >
          <template slot-scope="scope">
            <span style="color: #00d053;">{{ scope.row.income }}</span>
          </template>
        </el-table-column>

        <!--支出-->
        <el-table-column
          label="支出"
          prop="expend"
          width="60%"
        >
          <template slot-scope="scope">
            <span style="color: #f56767;">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>

        <!--备注-->
        <el-table-column
          label="备注"
          prop="remark"
          width="200%"
        ></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <Dialog
      :dialog="dialog"
      @update="getProfile"
      :formData="formData"
    ></Dialog>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog.vue";
export default {
  name: "fundlist",
  data() {
    return {
      tableData: [], //保存全部数据
      dialog: {
        show: false,
        title: "", //切换 添加/修改
        option: "edit",
      },
      //将原来位于Dialog.vue 的 formData 移到父组件中。以期完成编辑功能。因为编辑时，待编辑的数据来自父组件，交由子组件 Dialog 展示。
      formData: {
        ieType: "",
        ieDescribe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: "",
      },
    };
  },
  created() {
    this.getProfile();
  },
  components: {
    Dialog,
  },
  filters: {
    dateFilter(oldVal) {
      // 将时区修改为北京东八区
      let newDate = new Date(oldVal);
      return (
        newDate.getFullYear() +
        "-" +
        (newDate.getMonth() + 1) +
        "-" +
        newDate.getDate() +
        " " +
        newDate.getHours() +
        ":" +
        newDate.getMinutes() +
        ":" +
        newDate.getSeconds()
      );
    },
  },
  methods: {
    getProfile() {
      this.$axios
        .get("/api/profile/")
        .then((res) => {
          const { data } = res;
          this.tableData = data;
        })
        .catch((err) => {
          console.log("错误为:", err);
        });
    },
    textCenter() {
      //让表头和内容的文字居中
      return "text-align:center";
    },
    handleEdit(index, row) {
      this.dialog = {
        title: "编辑资金信息",
        show: true,
        option: "edit",
      };

      //将待修改的数据补到表单里.JS 的解构赋值自动将同名属性添加到 formData 中,和属性在内部声明从次序无关.
      (this.formData = {
        ieType: row.ieType,
        ieDescribe: row.ieDescribe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id,
      }),
        console.log(this.dialog, "index: " + index, "row:" + row);
    },
    handleDelete(index, row) {
      this.$axios
        .delete(`/api/profile/delete/${row._id}`)
        .then((res) => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          //刷新页面
          this.getProfile();
        })
        .catch((err) => {
          this.$message({
            message: err,
            type: "error",
          });
        });
    },

    handleAdd() {
      this.dialog = {
        title: "添加资金信息",
        show: true,
        option: "add",
      };

      //添加时给予一个空对象
      this.formData = {
        ieType: "",
        ieDescribe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: "",
      };
    },
  },
};
</script>

<style scoped>
.table-container {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.table {
  /* margin-left: 20%; */
  text-align: center;
}
.rightBtn {
  float: right;
}
</style>

