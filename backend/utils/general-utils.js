

export const normalizedTitleFunction = (title) => {

    let normalizedTitle = title.toLowerCase().replace(/\s+/g, ' ').trim();
    normalizedTitle = normalizedTitle.charAt(0).toUpperCase() + normalizedTitle.slice(1);

    return normalizedTitle;

};