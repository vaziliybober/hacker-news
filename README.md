# Hacker news

[![Maintainability](https://api.codeclimate.com/v1/badges/9dc5f87bb05bf8a3ca21/maintainability)](https://codeclimate.com/github/vaziliybober/hacker-news/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9dc5f87bb05bf8a3ca21/test_coverage)](https://codeclimate.com/github/vaziliybober/hacker-news/test_coverage)
![Node CI](https://github.com/vaziliybober/hacker-news/workflows/Node%20CI/badge.svg)

A React-Redux application that provides an interface to API Hacker News

# Аннотация для проверающих

Эту работу стоит проверить, тут очень классный код.

Архитектура: данные в redux хорошо нормализованы, их структура никак не подстраивается под отображение. В компонентах данные доступны через удобные хуки, которые предоставляют данные и действия из стора в максимально удобном виде. Из-за этого работа с состоянием очень проста на каждом слое (слое стора, хуков к стору, компонентов).

Интерфейс: доступна дополнительно загрузка лучших новостей (кнопка [Reload (top)]). Так вам будет легче проверить работу с комментариями.

Законченность: узнал о стажировке за 3 дня до конца приема заявок, загрузил заявку в последнюю секунду. Из-за этого не пофикшена строчка в тесте и не улучшены стили. Но во всем остальном проект полностью закончен.

# Link

https://hacker-news.vaziliybober.vercel.app/

# Clone

```
git clone git@github.com:vaziliybober/hacker-news.git
cd hacker-news
make install
make develop
```
