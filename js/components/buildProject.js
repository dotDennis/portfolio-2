export function projectHtml(project) {
  return `
    <section class="container__hero container__hero--project d-flex flex-column justify-content-center">
      <h1>${project.title}</h1>
      <p class="lead">${project.description}</p>
      <a class="cta-scroll" href="#introduction"><span class="material-icons">keyboard_arrow_down</span></a>
    </section>
    <div class="project__image mb-5">
      <img id="introduction" src="${project.image_url}" alt="${project.image_alt}" />
      <a title="View the website" aria-label="View the website" href="${project.website_url}"></a>
      </div>
    <section class="container container__introduction">
      <h2>Introduction</h2>
      <p>${project.introduction}</p>
    </section>
    <section class="container container__features">
      <h2>Features</h2>
      <p>${project.features_intro}</p>
      <h3>${project.feature_title_0}</h3>
      <p>${project.feature_desc_0}</p>
      <h3>${project.feature_title_1}</h3>
      <p>${project.feature_desc_1}</p>
      <h3>${project.feature_title_2}</h3>
      <p>${project.feature_desc_2}</p>
    </section>
    <div class="container__links d-flex justify-content-center mt-5 pt-3">
      <a href="${project.website_url}">View Website</a><a href="${project.source_url}">View Source</a><a href="/">Return Home</a>
    </div>`;
}
