const db = require('../dbConfig');

exports.productsAll = async (req, res) => {
  try {
    const collections = await db('collectionsWithStylesAndTotal');
    const collectionSets = await db('collectionsSet');
    const categories = await db('categories');
    // const products = await db();

    const collectionData = collections.map((item) => {
      let sets;
      sets = collectionSets.filter((set) => set.collectionsId === item.id);
      return { ...item, set: sets };
    });

    const appData = categories.map((category) => {
      let categoryItems;
      categoryItems = collectionData.filter(
        (collection) => collection.categoryId === category.id
      );

      return { ...category, items: categoryItems };
    });

    res.json(appData);
  } catch (err) {
    res.json({ message: ` 'error ' + ${error}` });
  }
};
