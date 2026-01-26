export default function TimeLine() {
  const steps = [
    {
      id: "01",
      title: "The Beginnings",
      description:
        "In 2013 we started with the translation of the meaning of the Quran, especially for children. An Urdu translation project started in 2018 and Alhamdulilah both translations are now complete and are soon to be published in electronic and on paper in the next year or so in sha Allah, depending on the availability of resources.",
    },
    {
      id: "02",
      title: "Hadith Collection",
      paragraphs: [
        "We started a Hadith Collection and collation project in 2015 by collecting available parent books translated in Urdu and English. By 2018 we had 53 books in our Hadith library. However, in 2019 we added 328 parent Hadith books of the Maktabah Shamilah of Madinah Al Munawarah University.",
        "This was a very major addition to our Hadith project. Over the next five years we were able to bring all parent Hadith books in a data base in soft format. This amounts to more than 200,000 A4 pages of Arabic writing. Previously translated books were also typed in the database.",
        "It turns out to be only 282,000 Ahdith out of available 1.34 million Ahdith (21,000 A4 pages out of 200,000). Within a year of noting this we set up a group of qualified scholars who translated over 150,000 Ahadith in the last 4 years.",
      ],
    },
    {
      id: "03",
      title: "Apps publish & fund Raise",
      paragraphs: [
        "Khushii Dua and Salah Book was launched last year. The app has over 170 lively illustrations, rewards and medals for learning and listening to duas.",
        "This app would also be very useful for parents and Islamic Madrasahs to involve kids into learning of Duas and Salah.",
        "Khushii Quran Stories App: To be released soon. With over 900 beautiful illustrations this carefully curated app tells our children stories of the Quran.",
      ],
    },
    {
      id: "04",
      title: "Distribution of Knowledge",
      paragraphs: [
        "With our experience of distributing Quran and Seerah Books from colourful shelves in our multifaith room, we invited chaplains from nearby trusts to join in.",
        "From each shelf almost 30 copies of the Quran translation are taken by Muslims and non-Muslims.",
        "Please donate generously so we can reach out to each and every hospital and prison in UK.",
      ],
    },
    {
      id: "05",
      title: "Publication on Paper",
      description:
        "Alhamdulilah we are in the process of getting Al-Mustafa Quran Translations published both in English and Urdu. The Urdu Quran is in the last stages of proofreading then editing will start. For the English Quran we are in talks with two publishers in the UK and Türkiye and soon we will have them published on paper for the seekers of knowledge.",
    },
  ];

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-sm tracking-widest text-gray-500 font-medium">
            THE STEPS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            OUR COMMITMENT
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gray-500 -translate-x-1/2 hidden md:block rounded-lg" />

          <div className="space-y-30">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              const delayClass = `timeline-delay-${index + 1}`;

              return (
                <div key={step.id} className="relative flex items-start">
                  {/* LEFT ID */}
                  {isLeft && (
                    <div className="w-full md:w-[calc(50%-2rem)] pr-8 text-right flex justify-end">
                      <span
                        className={`text-8xl text-[var(--color-secondary)]
                        timeline-animate-left ${delayClass}`}
                      >
                        {step.id}
                      </span>
                    </div>
                  )}

                  {/* LEFT CONTENT */}
                  {!isLeft && (
                    <div
                      className={`w-full md:w-[calc(50%-2rem)] pr-8 text-left
                      timeline-animate-left ${delayClass}`}
                    >
                      <h3 className="text-4xl font-semibold text-gray-500 mb-3">
                        {step.title}
                      </h3>
                      {step.paragraphs ? (
                        <div className="space-y-3">
                          {step.paragraphs.map((para, pIndex) => (
                            <p
                              key={pIndex}
                              className="text-gray-600 text-justify leading-relaxed"
                            >
                              {para}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 text-justify leading-relaxed">
                          {step.description}
                        </p>
                      )}
                    </div>
                  )}

                  {/* CENTER DOT */}
                  <div className="absolute left-1/2 top-8 -translate-x-1/2 hidden md:flex">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-secondary)] z-10" />
                  </div>

                  {/* RIGHT CONTENT */}
                  {isLeft && (
                    <div
                      className={`w-full md:w-[calc(50%-2rem)] pl-8 text-left
                      timeline-animate-right ${delayClass}`}
                    >
                      <h3 className="text-4xl font-semibold text-gray-500 mb-3 ml-16">
                        {step.title}
                      </h3>
                      {step.paragraphs ? (
                        <div className="space-y-3">
                          {step.paragraphs.map((para, pIndex) => (
                            <p
                              key={pIndex}
                              className="text-gray-600 text-justify leading-relaxed ml-16"
                            >
                              {para}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 text-justify leading-relaxed ml-16">
                          {step.description}
                        </p>
                      )}
                    </div>
                  )}

                  {/* RIGHT ID */}
                  {!isLeft && (
                    <div className="w-full md:w-[calc(50%-2rem)] pl-25 text-left flex justify-start">
                      <span
                        className={`text-8xl text-[var(--color-secondary)]
                        timeline-animate-right ${delayClass}`}
                      >
                        {step.id}
                      </span>
                    </div>
                  )}

                  {index < steps.length - 1 && <div className="h-16" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
