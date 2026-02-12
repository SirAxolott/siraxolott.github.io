require 'json'
require 'net/http'
require 'uri'

module GithubRepoCards
  class GithubRepoCardsGenerator < Jekyll::Generator
    safe true
    priority :high

    def generate(site)
      repo_config = site.data['repositories'] || {}
      github_users = repo_config['github_users'] || []
      github_repos = repo_config['github_repos'] || []

      headers = github_headers

      if github_users.any?
        site.data['github_profile_card'] = fetch_user(github_users.first, headers)
      end

      if github_repos.any?
        site.data['github_repo_cards'] = fetch_repos(github_repos, headers)
      end
    end

    private

    def github_headers
      headers = { 'User-Agent' => 'jekyll-site' }
      token = ENV['GITHUB_TOKEN']
      if token && !token.strip.empty?
        headers['Authorization'] = "token #{token}"
      end
      headers
    end

    def fetch_user(username, headers)
      data = get_json("https://api.github.com/users/#{username}", headers)
      return nil unless data

      {
        'username' => data['login'],
        'name' => data['name'] || data['login'],
        'bio' => data['bio'],
        'avatar_url' => data['avatar_url'],
        'html_url' => data['html_url'],
        'followers' => data['followers'],
        'following' => data['following'],
        'public_repos' => data['public_repos'],
        'location' => data['location'],
        'blog' => data['blog']
      }
    end

    def fetch_repos(repos, headers)
      repos.filter_map do |full_name|
        owner, repo = full_name.split('/', 2)
        next if owner.nil? || repo.nil?

        data = get_json("https://api.github.com/repos/#{owner}/#{repo}", headers)
        if data
          {
            'full_name' => data['full_name'],
            'name' => data['name'],
            'owner' => data.dig('owner', 'login'),
            'html_url' => data['html_url'],
            'description' => data['description'],
            'stargazers_count' => data['stargazers_count'],
            'forks_count' => data['forks_count'],
            'language' => data['language'],
            'updated_at' => data['pushed_at']
          }
        else
          {
            'full_name' => full_name,
            'name' => repo,
            'owner' => owner,
            'html_url' => "https://github.com/#{full_name}"
          }
        end
      end
    end

    def get_json(url, headers)
      uri = URI.parse(url)
      request = Net::HTTP::Get.new(uri)
      headers.each { |key, value| request[key] = value }

      response = Net::HTTP.start(uri.host, uri.port, use_ssl: true) do |http|
        http.request(request)
      end

      return nil unless response.code.to_i == 200

      JSON.parse(response.body)
    rescue StandardError => e
      Jekyll.logger.warn 'GitHub API', "Failed to fetch #{url}: #{e.message}"
      nil
    end
  end
end
