# README
---
## Chat-Space

### Ruby version 
2.3.1

### Database design

* messages table

|column   |type     |constraint       |
|:-------:|:-------:|:---------------:|
|body     |text     |                 |
|image    |string   |                 |
|group_id |reference|foreign_key: true|
|user_id  |reference|foreign_key: true|

* users table

|column               |type  |constraint               |
|:-------------------:|:----:|:-----------------------:|
|email                |string|null: false, unique: true|
|name                 |string|null: false              |
|password             |string|null: false              |
|confirmation_password|string|null: false              |


* groups table

|column|type  |constraint | 
|:----:|:----:|:---------:|
|name  |string|null: false|

* users_groups table

|column  |type     |constraint       |
|:------:|:-------:|:---------------:|
|user_id |reference|foreign_key: true|
|group_id|reference|foreign_key: true|

