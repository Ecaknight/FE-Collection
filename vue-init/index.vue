<template>
  <div>
    <!-- 标题 -->
    <div class="train-title">
      <span class="train-time">培训时间</span>
      <div class="train-title-left">{{ trainTimeStart }} - {{ trainTimeEnd }}</div>
      <div class="train-title-right">
        <el-progress :percentage="percentage" class="train-progress" color="#67c23a" />
        <span class="train-progress-play">
          计划进度:
          <span class="train-progress-number">{{ progressText }}</span>
        </span>
      </div>
    </div>
    <!-- 课程列表 -->
    <div v-for="item in courseList" :key="item.idx" class="train-course">
      <div class="train-course-title">
        <div class="course-number">{{ item.idx }}</div>
        <div class="course-name">
          {{ item.name }}
          <div v-if="!!item.isSign" class="course-sign-time">
            <span class="now-course-ing">
              <i class="el-icon-time" />
              上课中
            </span>
            <div class="now-course-time">
              课程时间: {{ item.courseTimeStart }} - {{ item.courseTimeEnd }}
            </div>
          </div>
        </div>
      </div>
      <ul class="train-course-detail">
        <li v-for="sub in item.subList" :key="sub.subName" class="train-course-list">
          <div class="course-list-name">
            <i class="el-icon-document" />
            <span>{{ sub.subName }}</span>
          </div>
          <div class="course-list-person">
            讲师: {{ sub.lecturer }}
            <div class="course-line" />
            助教: {{ sub.assistant }}
            <div class="course-line" />
            {{ sub.mode }}
          </div>
          <div class="course-train-data">
            <span v-show="sub.isQuestion" @click="onOpenQuestion">问卷</span>
            <div v-show="sub.isQuestion" class="course-line" />
            <span v-show="sub.isTest" @click="onCourseTest">随堂测</span>
            <div v-show="sub.isTest" class="course-line" />
            <span v-show="sub.isData" @click="onCourseData">课件</span>
          </div>
        </li>
      </ul>
      <!-- 按钮 -->
      <div class="btn-list">
        <el-button type="primary" size="small" @click="() => onStartExam(item)">开始考试</el-button>
        <el-button size="small" @click="() => onSignin(item)">设置签到</el-button>
        <el-button size="small" @click="() => onSendQuestion(item)">发送问卷</el-button>
      </div>
    </div>
    <!-- 结束课程 -->
    <div class="finish-course">
      <el-button type="primary" size="small" @click="onFinishCourse">结束课程</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trainTimeStart: '2022.02.02', // 培训开始时间
      trainTimeEnd: '2022.03.18',
      percentage: 10,
      courseList: []
    }
  },
  computed: {
    progressText() {
      const perc = this.percentage
      return perc <= 0 ? '未开始' : perc > 0 && perc < 100 ? '上课中' : '已结束'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.courseList = [
        {
          name: '产品经理入门课',
          idx: '课程一',
          courseTimeStart: '2022-01-01 09:00',
          courseTimeEnd: '2022-01-01 09:00',
          subList: [
            {
              subName: '产品经理入门课 A篇',
              lecturer: '李xxx彪',
              assistant: '陈xxx白',
              mode: '线下培训',
              isQuestion: true,
              isTest: true,
              isData: true
            },
            {
              subName: '产品经理入门课 B篇',
              lecturer: '李zzz彪',
              assistant: '陈ccc白',
              mode: '线上培训',
              isQuestion: false,
              isTest: false,
              isData: true
            }
          ]
        },
        {
          name: 'WEB前端入门课',
          idx: '课程二',
          subList: [
            {
              subName: 'WEB前端入门课 A篇',
              lecturer: '李xxx彪',
              assistant: '陈xxx白',
              mode: '线下培训',
              isQuestion: true,
              isTest: true,
              isData: true
            },
            {
              subName: 'WEB前端入门课 B篇',
              lecturer: '李zzz彪',
              assistant: '陈ccc白',
              mode: '线上培训',
              isQuestion: false,
              isTest: false,
              isData: true
            }
          ]
        }
      ]
    },
    onOpenQuestion() {
      window.open('http://www.baidu.com', '_blank')
    },
    onCourseTest() {
      this.$message('开始考试')
    },
    onCourseData() {
      window.open('http://www.baidu.com', '_blank')
    },
    onStartExam() {
      this.$message('开始考试')
    },
    onSignin(data = {}) {
      this.$message('已签到')
      const index = this.courseList.findIndex(i => i.idx === data.idx)
      if (index > -1) {
        this.$set(this.courseList[index], 'isSign', true)
      }
    },
    onSendQuestion() {
      this.$message('发送问卷')
    },
    onFinishCourse() {
      this.$message('结束课程')
    }
  }
}
</script>

<style lang="less" scoped>
@bgf3: #f3f3f4;
ul,
li {
  list-style: none;
  margin: 0px;
  padding: 0px;
}

// 培训时间标题
.train-title {
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 15px;
  background-color: @bgf3;
  border-radius: 2px;
  padding: 5px 15px;
  align-items: center;
  box-sizing: border-box;
  font-size: 14px;
  //  文字和时间
  .train-time {
    font-weight: 700;
    width: 65px;
    margin-right: 20px;
  }
  .train-title-left {
    max-width: 200px;
    margin-right: 20px;
  }
  .train-title-right {
    width: calc(100% - 280px);
    display: flex;
    // 进度条宽度
    .train-progress {
      width: 100%;
      margin-right: 10px;
    }
    .train-progress-play {
      width: 150px;
      .train-progress-number {
        font-weight: 700;
      }
    }
  }
}
// 培训课程
.train-course {
  width: 100%;
  margin-top: 28px;
  //   课程标题
  .train-course-title {
    width: 100%;
    height: 40px;
    display: flex;
    background-color: @bgf3;
    line-height: 40px;
    box-sizing: border-box;
    .course-number {
      width: 130px;
      text-align: center;
      color: #fff;
      background-color: rgba(51, 51, 51, 0.8);
    }
    .course-name {
      flex: 1;
      padding-left: 20px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      .course-sign-time {
        display: flex;
        width: 360px;
        .now-course-ing,
        .now-course-time {
          font-size: 12px;
          font-weight: 500;
        }
        .now-course-ing {
          margin-right: 16px;
          color: #e2ac2d;
        }
      }
    }
  }
  // 课程明细
  .train-course-detail {
    margin-top: 16px;
    box-sizing: border-box;
    .train-course-list {
      display: flex;
      align-items: center;
      height: 30px;
      line-height: 30px;
      padding: 0px 4px;
      position: relative;
      .course-list-name {
        min-width: 210px;
        font-weight: 700;
        i {
          margin-right: 8px;
          font-size: 16px;
          color: #e28f87;
        }
      }
      .course-list-person {
        min-width: 460px;
        color: #9c999a;
        display: flex;
        align-items: center;
        font-size: 14px;
      }
      //   课程资料
      .course-train-data {
        position: absolute;
        right: 18px;
        display: flex;
        align-items: center;
        span {
          cursor: pointer;
          color: #7654a8;
          font-size: 14px;
        }
      }
    }
  }
}
.btn-list {
  margin-top: 20px;
}
.course-line {
  display: inline-block;
  width: 1px;
  height: 16px;
  background-color: #c5c5c5;
  margin: 0px 15px;
}
.finish-course {
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  border-top: 1px solid #c5c5c5;
}
</style>
