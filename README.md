# 半額ハンター

## ◾サービス概要
「半額ハンター」はスーパーマーケットの割引情報を共有できるサービスです。
Googleマップからスーパーマーケットを検索して、割引情報を登録することが可能です。
## ◾サービスのURL
登録不要で使用することができます。
ぜひ、スーパーの割引情報を登録してみてください。
https://hangakuhunter.com/
## ◾開発の背景
一人暮らしをしていますが、よくスーパーのお惣菜やお弁当を買うことが多いです。
そこでなるべく安く購入するために、割引になる時間を狙って利用しています。
日々利用している店舗なら割引になる時間帯がわかりますが、他店になった途端わからなくなります。
そこで、この有益な情報を他の方と共有して、お買い得な食生活を過ごしたいと思い、開発いたしました。

## ◾機能・画面説明
- スーパーマーケット検索機能
- 割引情報投稿機能
- 割引情報削除機能
- 割引情報一覧表示機能
- 店舗詳細表示機能
  
## ◾使用技術
### バックエンド
- Ruby 3.1.2 / Rails 7.0.8.1
- コード解析 / フォーマッター: Rubocop
- テストフレームワーク: RSpec

### フロントエンド
- TypeScript 5.4.5 / React 18.3.1 / Next.js 14.1.3
- フォーマッター: Prettier
- コード解析: ESLint
- CSSフレームワーク: TailwindCSS

### インフラ
- AWS(Route53 / Certificate Manager / ALB / VPC / ECR / ECS Fargate / RDS MySQL )
- Nginx
### CI 
- GitHub Actions
### 環境構築
- GitHub Actions

## ◾インフラ構成図


## ◾ER図
![hangakuhunter_ER drawio](https://github.com/user-attachments/assets/e85d6937-da29-4d88-b74e-252dccbdfae4)


## ◾今後の展望
・ ログイン機能の追加
・ お気に入り機能の追加