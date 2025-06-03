import React from 'react'

const BlogPreview: React.FC = () => {
  return (
    <section id="blog" className="section-padding bg-white">
      <div className="container-responsive">
        <h2 className="text-4xl font-bold text-center text-neutral-900 mb-8">
          Blog de <span className="text-gradient">bienestar</span>
        </h2>
        <div className="text-center">
          <p className="text-lg text-neutral-600">
            Artículos de bienestar emocional próximamente...
          </p>
        </div>
      </div>
    </section>
  )
}

export default BlogPreview 