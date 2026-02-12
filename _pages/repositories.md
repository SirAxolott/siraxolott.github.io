---
layout: page
permalink: /repositories/
title: repositories
description: 
nav: true
nav_order: 4
---

<div class="repo-hub">
  {% assign profile = site.data.github_profile_card %}
  {% if profile %}
    {% include repository/profile_card.liquid profile=profile %}
  {% else %}
    {% include repository/profile_card.liquid %}
  {% endif %}

  <div class="repo-grid">
    {% assign repos = site.data.github_repo_cards %}
    {% if repos %}
      {% for repo in repos %}
        {% include repository/repo_card.liquid repo=repo %}
      {% endfor %}
    {% elsif site.data.repositories.github_repos %}
      {% for repo in site.data.repositories.github_repos %}
        {% include repository/repo_card.liquid repo=repo %}
      {% endfor %}
    {% endif %}
  </div>
</div>
