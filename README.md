# 半額ハンター

## ◾サービス概要
「半額ハンター」はスーパーマーケットの割引情報を共有できるサービスです。
Googleマップからスーパーマーケットを検索して、割引情報を登録することが可能です。
![image](https://github.com/user-attachments/assets/8b9bed1b-41f3-40ce-808e-d23d4671f814)


## ◾サービスのURL
登録不要で使用することができます。
ぜひ、スーパーの割引情報を登録してみてください。
https://hangakuhunter.com/
## ◾開発の背景
私は一人暮らしで、日々スーパーマーケットのお惣菜やお弁当を利用しています。限られた予算内で効率的に食事を調達するため、商品の割引時間帯を狙って購入することが習慣となっていますが、この知識は普段利用している店舗に限られがちです。
そこで、この有用な情報を広くコミュニティで共有できるプラットフォームがあれば、多くの人々がより経済的で豊かな食生活を送れると考え、「半額ハンター」の開発に至りました。本サービスを通じて、ユーザー同士が協力して情報を共有し合うことで、誰もがスマートな消費活動を行える環境を整えることが目標です。

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
### CICD
- GitHub Actions

## ◾インフラ構成図
![hangakuhunter_infra drawio](https://github.com/user-attachments/assets/3b342087-339d-48d2-b1e6-57cc6d5281bf)

## ◾ER図
![hangakuhunter_ER drawio](https://github.com/user-attachments/assets/e85d6937-da29-4d88-b74e-252dccbdfae4)


## ◾今後の展望
・ ログイン機能の追加
・ お気に入り機能の追加