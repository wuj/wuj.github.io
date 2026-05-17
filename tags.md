---
layout: page-with-social
title: Tags
permalink: /tags/
description: "Browse posts on this site by topic. Each tag groups every post that shares a keyword, sorted by publication date."
---

Posts grouped by tag.

{% assign sorted_tags = site.tags | sort %}
{% for tag in sorted_tags %}
<h2 id="{{ tag[0] | slugify }}">#{{ tag[0] | escape }} <span class="post-meta">({{ tag[1].size }})</span></h2>
<ul>
  {% for post in tag[1] %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
    <span class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</span>
  </li>
  {% endfor %}
</ul>
{% endfor %}
