const OWNER = "你的GitHub用户名";
const REPO = "blog-data";

// 博客列表
async function loadPosts() {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/issues`
  );
  const issues = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  issues.forEach(issue => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <a href="post.html?id=${issue.number}">
        <h3>${issue.title}</h3>
      </a>
      <small>${issue.created_at.slice(0, 10)}</small>
    `;
    list.appendChild(div);
  });
}

// 文章详情
async function loadPost() {
  const id = new URLSearchParams(location.search).get("id");
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/issues/${id}`
  );
  const issue = await res.json();

  document.getElementById("title").innerText = issue.title;
  document.getElementById("content").innerHTML =
    marked.parse(issue.body);
}
