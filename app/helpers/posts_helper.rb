module PostsHelper
  def has_children?(comment)
    @comment_hash.any? { |k, _| k == comment.id }
  end

  def display_children_comments(comment)
    a=""
     a += <<-HTML
      <li>
        <h5>#{comment.author.email} @ #{comment.created_at}: (#{comment.score})</h5>

        <form action="#{ upvote_comment_url(comment) }" method="post">
          #{form_auth}
          <button>Upvote</button>
        </form>
        <form action="#{ downvote_comment_url(comment) }" method="post">
          #{form_auth}
          <button>Downvote</button>
        </form>

        <p>#{comment.content}</p>

        <p class="reply_link"><a href="#{comment_url(comment)}">reply</a></p>
        <div class="clear"></div>
      </li>
    HTML
    if has_children?(comment)
      a += "<ul>"
      @comment_hash[comment.id].each do |c2|
        a += "#{display_children_comments(c2)}"
      end
      a += "</ul>"
    end
    return a.html_safe
  end
end
