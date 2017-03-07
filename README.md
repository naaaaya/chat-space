# README
---
## Chat-Space

### Ruby version
2.3.1

### Database design

* messages table

belongs_to: user
belongs_to: group

|column   |type      |constraint       |
|:-------:|:--------:|:---------------:|
|body     |text      |                 |
|image    |string    |                 |
|group    |references|foreign_key: true|
|user     |references|foreign_key: true|

* users table

has_many :messages
has_many :groups, through: :users_groups
has_mamy :users_groups

|column               |type  |constraint               |
|:-------------------:|:----:|:-----------------------:|
|email                |string|null: false, unique: true|
|name                 |string|null: false              |
|password             |string|null: false              |
|confirmation_password|string|null: false              |


* groups table

has_many :messages
has_many :users, through :users_groups
has_many :users_groups

|column|type  |constraint |
|:----:|:----:|:---------:|
|name  |string|null: false|

* users_groups table

belongs_to :user
belongs_to :group

|column  |type      |constraint       |
|:------:|:--------:|:---------------:|
|user    |references|foreign_key: true|
|group   |references|foreign_key: true|

