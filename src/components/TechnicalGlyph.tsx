import styles from './TechnicalGlyph.module.css'

type TechnicalGlyphKind = 'frontend' | 'backend' | 'data' | 'tools' | 'vision' | 'cloud'

export function TechnicalGlyph({ kind }: { kind: TechnicalGlyphKind }) {
  return (
    <svg className={styles.glyph} viewBox="0 0 300 160" aria-hidden="true" focusable="false">
      {kind === 'frontend' && (
        <>
          <rect className={styles.outline} x="23" y="24" width="254" height="114" rx="7" />
          <path className={styles.secondary} d="M23 45h254" />
          <g className={styles.signal}>
            <circle cx="36" cy="35" r="2" /><circle cx="44" cy="35" r="2" /><circle cx="52" cy="35" r="2" />
          </g>
          <rect className={styles.secondary} x="35" y="57" width="46" height="68" rx="3" />
          <path className={styles.quiet} d="M44 68h27M44 80h20M44 92h24M44 114h15" />
          <rect className={styles.primary} x="94" y="57" width="169" height="19" rx="3" />
          <path className={styles.secondary} d="M105 66h58M246 66h6" />
          <rect className={styles.secondary} x="94" y="86" width="78" height="39" rx="3" />
          <rect className={styles.secondary} x="184" y="86" width="79" height="39" rx="3" />
          <path className={styles.quiet} d="M105 99h47M105 111h34M195 99h47M195 111h34" />
        </>
      )}
      {kind === 'backend' && (
        <>
          <path className={styles.secondary} d="M82 81h32m70 0h32M37 29h112v16M149 115v18h95" />
          <path className={styles.primaryLine} d="m107 77 7 4-7 4m102-8 7 4-7 4" />
          <rect className={styles.outline} x="20" y="50" width="62" height="62" rx="6" />
          <rect className={styles.primary} x="114" y="44" width="70" height="74" rx="6" />
          <rect className={styles.outline} x="216" y="50" width="64" height="62" rx="6" />
          <path className={styles.secondary} d="m42 70-9 11 9 11m18-22 9 11-9 11m-12 4 6-28" />
          <g className={styles.primaryLine}>
            <path d="M149 61v11m0 18v11m-11-20h-9m40 0h-9" />
            <circle cx="149" cy="81" r="10" />
          </g>
          <path className={styles.secondary} d="M231 68h34M231 81h34M231 94h22" />
          <circle className={styles.signal} cx="37" cy="29" r="3" />
          <circle className={styles.signal} cx="244" cy="133" r="3" />
        </>
      )}
      {kind === 'data' && (
        <>
          <rect className={styles.outline} x="33" y="27" width="104" height="106" rx="5" />
          <rect className={styles.primary} x="33" y="27" width="104" height="24" rx="5" />
          <rect className={styles.outline} x="172" y="47" width="95" height="86" rx="5" />
          <rect className={styles.primary} x="172" y="47" width="95" height="24" rx="5" />
          <path className={styles.secondary} d="M33 51h104M33 72h104M33 92h104M33 112h104M64 51v82M172 71h95M172 92h95M172 112h95M199 71v62" />
          <path className={styles.primaryLine} d="M137 62h17v20h18m-6-5 6 5-6 5" />
          <g className={styles.signal}>
            <circle cx="48" cy="62" r="2.5" /><circle cx="186" cy="82" r="2.5" />
          </g>
          <path className={styles.quiet} d="M75 62h44M75 82h32M75 102h38M75 122h24M210 82h39M210 102h26M210 122h33" />
        </>
      )}
      {kind === 'tools' && (
        <>
          <path className={styles.secondary} d="M25 101h250" />
          <path className={styles.primaryLine} d="M73 101c18 0 20-55 49-55h43c30 0 34 55 64 55" />
          <g className={styles.outline}>
            <circle cx="39" cy="101" r="7" /><circle cx="73" cy="101" r="7" />
            <circle cx="139" cy="101" r="7" /><circle cx="195" cy="101" r="7" />
            <circle cx="257" cy="101" r="7" />
          </g>
          <g className={styles.primary}>
            <circle cx="125" cy="46" r="7" /><circle cx="163" cy="46" r="7" /><circle cx="229" cy="101" r="7" />
          </g>
          <path className={styles.quiet} d="M29 122h20M63 122h20M128 122h22M247 122h20M115 26h20M153 26h20" />
          <path className={styles.secondary} d="m224 101 3 3 6-7" />
        </>
      )}
      {kind === 'vision' && (
        <>
          <rect className={styles.outline} x="18" y="28" width="170" height="105" rx="5" />
          <path className={styles.quiet} d="M28 64h150M28 98h150M62 38v85M104 38v85M146 38v85" />
          <path className={styles.primaryLine} d="M72 65V54h14m30 0h14v11m0 31v11h-14m-30 0H72V96" />
          <circle className={styles.secondary} cx="101" cy="81" r="16" />
          <path className={styles.primaryLine} d="M93 81h16m-8-8v16M130 81h74m-7-5 7 5-7 5" />
          <circle className={styles.signal} cx="101" cy="81" r="2.5" />
          <rect className={styles.outline} x="211" y="53" width="70" height="57" rx="5" />
          <path className={styles.secondary} d="M223 68h45M223 81h45M223 94h27" />
          <g className={styles.signal}>
            <circle cx="221" cy="124" r="2.5" /><circle cx="237" cy="124" r="2.5" /><circle cx="253" cy="124" r="2.5" /><circle cx="269" cy="124" r="2.5" />
          </g>
          <path className={styles.quiet} d="M34 40h9m-4.5-4.5v9M161 121h13" />
        </>
      )}
      {kind === 'cloud' && (
        <>
          <path className={styles.outline} d="M64 111h75c18 0 29-11 29-26 0-14-10-26-24-28-5-20-20-31-39-31-21 0-37 14-41 33-19-2-34 10-34 26 0 15 14 26 34 26Z" />
          <path className={styles.secondary} d="M168 83h23m0-35v70M191 48h32m-32 35h32m-32 35h32" />
          <g className={styles.primary}>
            <rect x="223" y="34" width="52" height="28" rx="5" />
            <rect x="223" y="69" width="52" height="28" rx="5" />
            <rect x="223" y="104" width="52" height="28" rx="5" />
          </g>
          <path className={styles.secondary} d="M235 48h28M235 83h28M235 118h28" />
          <path className={styles.primaryLine} d="M98 90V62m-10 10 10-10 10 10" />
          <circle className={styles.signal} cx="191" cy="83" r="3" />
        </>
      )}
    </svg>
  )
}
