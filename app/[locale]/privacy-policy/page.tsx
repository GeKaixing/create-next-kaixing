export default function PrivacyPolicyPage() {
  return (
    <article className="prose prose-lg max-w-none dark:prose-invert">
      <h1>隐私政策</h1>
      <p>
        我们非常重视您的隐私权。本隐私政策说明了我们如何收集、使用、存储和保护您的个人信息。
      </p>

      <h2>信息收集</h2>
      <p>我们可能收集以下类型的信息：</p>
      <ul>
        <li>
          <strong>个人信息</strong>：姓名、电子邮件地址、电话号码等
        </li>
        <li>
          <strong>使用信息</strong>：网站访问记录、页面浏览历史等
        </li>
        <li>
          <strong>技术信息</strong>：IP 地址、浏览器类型、设备信息等
        </li>
      </ul>

      <h2>信息使用</h2>
      <p>我们收集的信息将用于：</p>
      <ul>
        <li>提供和改进我们的服务</li>
        <li>与您沟通</li>
        <li>遵守法律义务</li>
        <li>保护我们的权利和利益</li>
      </ul>

      <h2>信息保护</h2>
      <p>
        我们采用适当的技术和组织措施来保护您的个人信息，防止未经授权的访问、使用或披露。
      </p>

      <h2>信息共享</h2>
      <p>我们不会向第三方出售、交易或转让您的个人信息，除非：</p>
      <ul>
        <li>获得您的明确同意</li>
        <li>法律要求</li>
        <li>保护我们的权利和安全</li>
      </ul>

      <h2>联系我们</h2>
      <p>如果您对本隐私政策有任何疑问，请通过以下方式联系我们：</p>
      <ul>
        <li>电子邮件：privacy@example.com</li>
        <li>电话：+86-xxx-xxxx-xxxx</li>
      </ul>

      <h2>政策更新</h2>
      <p>
        我们可能会不时更新本隐私政策。任何更改将在本页面上发布，并更新“最后更新”日期。
      </p>

      <hr />
      <p>
        <em>本隐私政策最后更新于 {new Date().toLocaleDateString('zh-CN')}</em>
      </p>
    </article>
  );
}


