/* eslint-disable no-console */
import chai from 'chai';
import chaiAsPromise from 'chai-as-promised';
import models from '<serverModels>';
import { createEllipsis } from '<helpers>/utils';
import { newArticle } from '<fixtures>/article';

chai.use(chaiAsPromise);
const { expect } = chai;
const { Article, sequelize } = models;

before(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
});

describe('Article Model', async () => {
  it('should create an artcle', async () => {
    let article;
    try {
      article = await Article.create(newArticle);
    } catch (error) {
      console.log(error);
    }

    const {
      title, body, description, userId, isBlacklisted, categoryId, isPublished
    } = article;
    expect(newArticle.title).to.be.equal(title);
    expect(newArticle.body).to.be.equal(body);
    expect(newArticle.userId).to.be.equal(userId);
    expect(newArticle.isBlacklisted).to.be.equal(isBlacklisted);
    expect(newArticle.categoryId).to.be.equal(categoryId);
    expect(newArticle.isPublished).to.be.equal(isPublished);
    expect(description).to.be.equal(createEllipsis(body));
  });

  it('should delete an article', async () => {
    try {
      const article = await Article.create(newArticle);
      expect(article.id).to.be.a('string');
      await Article.drop();
      expect(Article.findOne({ where: { id: article.id } })).to.rejectedWith(Error);
    } catch (error) {
      console.log(error);
    }
  });
});