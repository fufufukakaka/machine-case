# machine-case
leaderboard for your machine learning model tuning

# Todo
- [x] Setting Table(Basic Style,Link,Dropdown)
- [x] python server setting(flask)
- [ ] connect sqlite3
- [ ] python manipulation API(Catch learned model, Submission from python)

# Database Definition
## consufion_matrix
```
CREATE TABLE "confusion_matrix" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `submission_id` INTEGER, `row_class` TEXT, `column_class` TEXT, `value` INTEGER )
```
## leaderboard
```
CREATE TABLE "leaderboard" ( `id` INTEGER NOT NULL, `main_target` VARCHAR ( 255 ), `sub_target` VARCHAR ( 255 ), `recall` NUMERIC, `f1` NUMERIC, `auc` NUMERIC, `version` INTEGER, `model` TEXT, PRIMARY KEY(`id`) )
```
## model_detail
```
CREATE TABLE `model_detail` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `submission_id` INTEGER, `content` TEXT )
```
