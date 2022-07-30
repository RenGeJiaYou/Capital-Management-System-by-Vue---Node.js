<template>
  <div class>
    <el-table
      v-if="tableData.length>0"
      :data="tableData"
      style="margin-left: 20%"
    >
      <el-table-column
        label="日期"
        width="180"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="180"
      >
        <template slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top"
          >
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div
              slot="reference"
              class="name-wrapper"
            >
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "fundlist",
  data() {
    return {
      tableData: [], //保存全部数据
    };
  },
  created() {
    this.getProfile();
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
  },
};
</script>

<style>
</style>

