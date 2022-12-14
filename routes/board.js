var express = require("express");
var router = express.Router();
var mysql = require("mysql");
//var mysql_odbc = require("../db/db_conn")();
//var conn = mysql_odbc.init();

var db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "2073",
  database: "nodedb",
});

db.connect();

router.get("/list", function (req, res, next) {
  res.redirect("/board/list/1");
});

router.get("/list/:page", function (req, res, next) {
  var page = req.params.page;
  var sql =
    "SELECT idx, name, title, content, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
    "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate, hit from board";

  db.query(sql, function (err, rows) {
    if (typeof rows == "undefined") {
      throw err;
    }

    if (err) {
      console.error("err : " + err);
    }
    console.log(rows);
    res.render("list", { title: "나의 TODO List", rows: rows });
  });
});
module.exports = router;

router.get("/write", function (req, res, next) {
  res.render("write", { title: "게시판 글 쓰기" });
});

router.post("/write", function (req, res, next) {
  var name = req.body.name;
  var title = req.body.title;
  var content = req.body.content;
  var passwd = req.body.passwd;
  var datas = [name, title, content, passwd];

  var sql =
    "insert into board(name, title, content, regdate, modidate, passwd,hit) values(?,?,?,now(),now(),?,0)";
  db.query(sql, datas, function (err, rows) {
    if (err) console.error("err : " + err);
    res.redirect("/board/page/1");
  });
});

router.get("/read/:idx", function (req, res, next) {
  var idx = req.params.idx;
  var sql =
    "select idx, name, title, content, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
    "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,hit from board where idx=?";

  db.query(sql, [idx], function (err, rows) {
    if (err) console.error(err);
    res.render("read", { title: "글 상세", row: rows[0] });
  });
});

router.post("/update", function (req, res, next) {
  var idx = req.body.idx;
  var name = req.body.name;
  var title = req.body.title;
  var content = req.body.content;
  var passwd = req.body.passwd;
  var datas = [name, title, content, idx, passwd];

  var sql =
    "update board set name=? , title=?,content=?, modidate=now() where idx=? and passwd=?";
  db.query(sql, datas, function (err, result) {
    if (err) console.error(err);
    if (result.affectedRows == 0) {
      res.send(
        "<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>"
      );
    } else {
      res.redirect("/board/page/1" + idx);
    }
  });
});

router.get("/page/:page", function (req, res, next) {
  var page = req.params.page;
  var sql =
    "select idx, name, title, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
    "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,hit from board";

  db.query(sql, function (err, rows) {
    if (err) {
      console.error("err : " + err);
    }
    res.render("page", {
      title: " 나의 TODO list",
      rows: rows,
      page: page,
      length: rows.length - 1,
      page_num: 10,
    });
    console.log(rows.length - 1);
  });
});

router.post("/delete", function (req, res, next) {
  var idx = req.body.idx;
  var passwd = req.body.passwd;
  var datas = [idx, passwd];

  var sql = "delete from board where idx=? and passwd=?";
  db.query(sql, datas, function (err, result) {
    if (err) console.error(err);
    if (result.affectedRows == 0) {
      res.send(
        "<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>"
      );
    } else {
      res.redirect("/board/page/1");
    }
  });
});
