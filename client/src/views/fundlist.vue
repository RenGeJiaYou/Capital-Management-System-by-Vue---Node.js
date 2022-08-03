<template>
  <div class="table-container">
    <!--表单区,筛选&添加按钮-->
    <div>
      <!--只有一行元素的表单-->
      <el-form
        :inline="true"
        ref="add_data"
        :model="searchData"
      >
        <el-form-item label="按时间筛选">
          <el-date-picker
            v-model="searchData.startTime"
            type="datetime"
            placeholder="选择开始时间"
            style="margin-right:15px"
          ></el-date-picker>
          <el-date-picker
            v-model="searchData.endTime"
            type="datetime"
            placeholder="选择结束时间"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="search"
            round
            @click="handleSearch()"
          >筛选</el-button>
        </el-form-item>

        <el-form-item class="rightBtn">
          <el-button
            type="primary"
            size="small"
            icon="view"
            v-if="user.identity==='manager'"
            @click="handleAdd()"
          >添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格区-->
    <div>
      <!--表格-->
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

        <el-table-column
          label="操作"
          v-if="user.identity==='manager'"
        >
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

      <!--分页器-->
      <el-row>
        <el-col :span="24">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginations.currentPage"
            :page-sizes="paginations.pageSizes"
            :page-size="paginations.pageSize"
            :layout="paginations.layout"
            :total="paginations.total"
            class="pagination"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>

    <!--弹窗-->
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
      searchData: {
        //(父)  :model  <form>绑定 JS对象
        //(子)  v-model <item>绑定 JS对象的字段
        startTime: "", //Date 对象的空值可以是""
        endTime: "",
      },

      tableData: [], //保存 allTableData[]的部分数据,5/10条不等,是表格的绑定数据
      allTableData: [], //保存全部数据
      filterTableData: [], //筛选数据容器
      //分页器配置
      paginations: {
        currentPage: 1, //设置默认当前页
        pageSizes: [5, 10, 15, 20], //可选的一页数量
        pageSize: 5, //默认的一页数量
        layout: "total, sizes, prev, pager, next, jumper", //分页器组件布局
        total: 10, //不可在此处写this.tableData.length.因为 Vue 初始化该数据的时候 tableData 还未被分配内存,甚至不能称为一个 length=0 的空数组.
        //但可写在<el-pagination>的属性里,因为组件被初始化前,数组已经通过created()被赋值
      },
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
  computed: {
    //从vuex 中获取的数据只能在computed 中调用
    // computed 的 函数可当作data(){} 中的同名数据
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    getProfile() {
      this.$axios
        .get("/api/profile/")
        .then((res) => {
          const { data } = res;
          this.allTableData = data;
          this.filterTableData = data; //filterTableData[]拥有全量数据,筛选操作后导入allTable[]
          //设置分页数据
          this.setPaginations();
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
    handleSizeChange(pageSize) {
      // handleSizeChange() 在条目数量变化时触发,形参是 所选定的每页数量
      this.paginations.currentPage = 1; //切换每页条数后,返回第一页
      this.paginations.pageSize = pageSize; //调整 paginations 参数
      //重新设置展示的表格数据源
      this.tableData = this.allTableData.filter((item, index) => {
        return index < pageSize;
      });
    },
    handleCurrentChange(currentPage) {
      // handleCurrentChange() 在当前页数变化时触发,形参是 所选定的页码
      // this.paginations.currentPage = currentPage;
      let index = this.paginations.pageSize * (currentPage - 1); //当前页码的第一条数据
      let offset = this.paginations.pageSize; //数量
      let tempTableData = []; //临时装数据用
      for (let i = index; i < index + offset; i++) {
        if (this.allTableData[i]) {
          tempTableData.push(this.allTableData[i]);
        }
      }
      this.tableData = tempTableData;
    },
    //分页属性设置
    setPaginations() {
      this.paginations.total = this.allTableData.length; //提前将数组长度传给分页器
      this.paginations.currentPage = 1; //切换后总是回到第一页
      this.paginations.pageSize = 5; //默认的一页数量

      //设置默认的分页数量
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.pageSize;
      });
    },

    //筛选功能
    handleSearch() {
      if (!this.searchData.startTime || !this.searchData.endTime) {
        this.$message({
          message: "时间范围不能为空!",
          type: "warning",
        });
        this.getProfile();
        return;
      }

      const startTime = this.searchData.startTime.getTime();
      const endTime = this.searchData.endTime.getTime();

      this.allTableData = this.filterTableData.filter((item) => {
        // filter() 对每个元素调用一次回调函数,返回值是一个 bool 表达式
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= startTime && time <= endTime;
      });

      this.setPaginations();
    },
  },
};
</script>

<style scoped>
.table-container {
  width: 100%;
  height: auto;
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
.pagination {
  margin-top: 8px;
  float: right;
}
</style>

