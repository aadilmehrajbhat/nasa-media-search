import _ from 'lodash';

const paginate = (data, currentPage, itemsToShow) => {
  const startIndex = (currentPage - 1) * itemsToShow;

  return _(data).slice(startIndex).take(itemsToShow).value();
};

export default paginate;
